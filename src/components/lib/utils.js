export const LAYER_LIMIT = 3;

export function getUrlSearchParams() {
  const search = window.location.search.substring(1);
  const searchParamsSegments = search.split('&');
  let params = {};
  for (const p of searchParamsSegments) {
    const keyValuePair = p.split('=');
    if (keyValuePair.length > 1) {
      // key-value param
      const key = decodeURIComponent(keyValuePair[0]);
      const value = decodeURIComponent(keyValuePair[1]);
      if (key in params) {
        params[key] = [...params[key], value];
      } else {
        params[key] = [value];
      }
    } else if (keyValuePair.length === 1) {
      // boolean param
      const key = decodeURIComponent(keyValuePair[0]);
      params[key] = true;
    }
  }
  return params;
}

const schema = {
  type: 'object',
  properties: {
    edges: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          coordinates: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
          meta: {
            type: 'object',
            properties: { endpoint_identifiers: { type: 'object' } },
          },
        },
        required: ['name', 'coordinates', 'meta'],
      },
    },
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          coordinate: { type: 'array', items: { type: 'number' } },
        },
        required: ['name', 'coordinate'],
      },
    },
  },
  required: ['edges', 'nodes'],
  additionalProperties: true,
};

// helper function for JSON validation: works on arrays
const validateArray = function(itemSchema, data){
  var output = { 'valid': true, errorDetails: {} }
  for(var i=0; i<data.length; i++){
    var { valid, errorDetails } = validate(itemSchema.items, data[i]);
    output['valid'] = valid && output['valid'];
    output['errorDetails'] = errorDetails;
    if(!valid){
      return output;
    }
  }
  return output
}

// main JSON validation function: heavily recursive
const validate = function(schema, data){
  // do type check
  var output = { "valid": true, "errorDetails": "" }
  const typeCheckers = {
    'object': (data)=>{ return typeof(data) === "object"; },
    'number': (data)=>{ return typeof(data) === "number" },
    'string': (data)=>{ return typeof(data) === "string" || data instanceof String; },
    'boolean': (data)=>{ return typeof(data) === 'boolean' },
    'null': (data)=>{ return data === null },
    'array': Array.isArray
  }
  if(!typeCheckers[schema['type']](data)){
    output["valid"] = false;
    output.errorDetails += "Type check failed.<br>"
    return output;
  }
  // recursive call for each property listed above
  var props = schema.properties ? Object.keys(schema.properties) : [];
  for(var i=0; i<props.length; i++){
      var propName = props[i];
      if(!data[propName] && schema.required.indexOf(propName)>=0){
        output['valid'] = false;
        output['errorDetails'] = "required property '"+propName+"' is not set<br>";
        return output;
      }
  }
  props.forEach((propName)=>{
      var valid = true;
      var errorDetails = "";
      switch(schema.properties[propName]['type']) {
        case 'array':
          var interimOutput = validateArray(schema.properties[propName], data[propName]);
          valid = interimOutput['valid'];
          errorDetails = interimOutput['errorDetails'];
          break;
        default:
          var interimOutput = validate(schema.properties[propName], data[propName]);
          valid = interimOutput['valid'];
          errorDetails = interimOutput['errorDetails'];
      }
      output['valid'] = !!(valid && output['valid']);
      Object.keys(errorDetails).forEach((childProp)=>{
        var accessor = childProp == "" ? propName : propName + "." + childProp;
        output['errorDetails'] += errorDetails[childProp];
      })
  })
  return output;
}

export function testJsonSchema(data) {
  const {valid, errorDetails} = validate(schema, data);
  if (valid) {
    return [valid, 'valid'];
  } else {
    return [valid, errorDetails];
  }
}

export function resolvePath(object, path, defaultValue=null){
  return path
    .split(/[\.\[\]\'\"]/)
    .filter(p => p) // remove empty splits
    .reduce((o, p) => o ? o[p] : defaultValue, object)
}

export function setPath(object, path, newValue){
  let splitPath = path
    .split(/[\.\[\]\'\"]/)
    .filter(p => p)
  let o = object;
  let lastItem = splitPath.pop();
  splitPath.forEach((p)=>{
    o = o[p]
  })
  o[lastItem] = newValue;
}

/**
 * Returns the text content of an element and its descendents, including A11y text that would otherwise be hidden.
 *
 * Script elements are entirely omitted. Graphical and form elements represented in tags <img>, <area>, <svg>,
 * or <input> (with attribute type="image") are omitted except where attributes (in order of preference) aria-labelledby,
 * aria-label, alt, or title are set to non-empty values.
 *
 * Adapted from implementation on 456 Berea Street, see link below.
 *
 * @param {Element} el                  The target element to render text from.
 * @returns {string} The text contnet of the element and its children.
 * @see {@link https://www.456bereastreet.com/archive/201105/get_element_text_including_alt_text_for_images_with_javascript/ Roger Johanssonu's 456 Berea Street}
 */
export function getElementText(el) {
	var text = '';
    const supportedTagSelectors = ['img', 'area', 'input[type="image"]', 'svg'];
    const a11yAttributes = ['aria-labelledby', 'aria-label', 'alt', 'title'];
	// Text node (3) or CDATA node (4) - return its text
	if (el.nodeType === 3 || el.nodeType === 4) {
		text = el.nodeValue || '';
	// If node is an element (1) and an <img>, <svg>, <input type="image">, or <area> element, return its a11y text
	} else if (el.nodeType === 1 && (supportedTagSelectors.find(selector => el.matches(selector)))) {
    text = a11yAttributes.reduce((acc, attributeName) => {
        if (!!acc) {
            return acc;
        } else if (el.hasAttribute(attributeName)) {
            acc = el.getAttribute(attributeName) || '';
        }
        return acc;
    }, '');
	// Traverse children unless this is a script or style element
	} else if ( (el.nodeType === 1) && !el.tagName.match(/^(script|style)$/i) ) {
		var children = el.childNodes;
		for (var i = 0, l = children.length; i < l; i++) {
			text += getElementText(children[i]);
		}
	}
	return text;
};


try {
  const Utils = {
    getUrlSearchParams,
    schema,
    validateArray,
    validate,
    testJsonSchema,
    resolvePath,
    setPath,
    getElementText,
    LAYER_LIMIT
  }
  module.exports.Utils = Utils;
  exports.Utils = Utils;
} catch (e) {
  console.debug(e)
}