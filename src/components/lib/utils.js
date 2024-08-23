export const LAYER_LIMIT = 3;

/**
 * Defines delimiters for object prop paths when using resolvePath and setPath.
 * @var {RegExp}
 */
const PATH_DELIMITER_REGEXP = /[\.\[\]\'\"]/;

/**
 * Retrives query parameters in the URL from the browser's location as an
 * object with key-value pairs matching those of the URL parameters, with
 * any URL encoded characters decoded.
 *
 * @returns {{[queryKey: string]: any}]
 */
export function getUrlQueryParams() {
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

/**
 * Schema for a topology.
 */
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

/**
 * helper function for JSON validation: works on arrays
 *
 * @param {} itemSchema
 * @param {} data
 */
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
/**
 * Validates a given object against a provided JSON schema.
 *
 * @param {any} schema
 * @param {any} data
 * @returns {{ valid: boolean, errorDetails: string }}}   An object with a prop valid set to true if validation passes.
 *                                                        A prop errorDetails contains an empty string if passing, otherwise
 *                                                        it contains the reason for validation failure.
 */
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

/**
 * Returns a tuple, of which the first element is true if data passes validation for a JSON schema,
 * false otherwise. A false value will replace the second element (which defaults to simply a string 'valid' upon
 * validation passing), to information regarding the error.
 *
 * @param {any} data      The data to validate
 * @returns {[boolean, any]}
 */
export function testJsonSchema(data) {
  const {valid, errorDetails} = validate(schema, data);
  if (valid) {
    return [valid, 'valid'];
  } else {
    return [valid, errorDetails];
  }
}

/**
 * Gets the specified property or nested property of an object
 *
 * @param {object} object           The object from which to get the value using path
 * @param {string} path             The specified or nested property from which to get the value in object
 * @param {null|any} defaultValue   Optional. The default value to return in the case that the specified or nested property
 *                                  is not defined. Defaults to null.
 * @returns {any} The value of the specified or nested property given path upon object.
 */
export function resolvePath(object, path, defaultValue=null){
  return path
    .split(PATH_DELIMITER_REGEXP)
    .filter(p => p) // remove empty splits
    .reduce((o, p) => o ? o[p] : defaultValue, object)
}

/**
 * Sets a newValue upon the specified property or nested property of an object
 *
 * @param {object} object  The object in which to set a new value using path
 * @param {string} path    The specified or nested property at which to set the value
 * @param {any} newValue   The value to set at path within object.
 */
export function setPath(object, path, newValue){
  let splitPath = path
    .split(PATH_DELIMITER_REGEXP)
    .filter(p => p)
  let o = object;
  let lastItem = splitPath.pop();
  splitPath.forEach((p)=>{
    o = o[p]
  })
  o[lastItem] = newValue;
}

try {
  const Utils = {
    getUrlQueryParams,
    schema,
    validateArray,
    validate,
    testJsonSchema,
    resolvePath,
    setPath,
    LAYER_LIMIT
  }
  module.exports.Utils = Utils;
  exports.Utils = Utils;
} catch (e) {
}

export function sanitizeNode(node){
  let output = {
    name: node.name,
    meta: node.meta,
    coordinate: node.coordinate,
  };
  if(node.children && node.children.length > 0){
    output["children"] = node.children;
  }
  return output;
};

export function sanitizeEdge(edge){
  return {
    name: edge.name,
    meta: edge.meta,
    coordinates: edge.coordinates,
    children: edge.children,
  };
};

export function sanitizeTopology(layerData) {
  return {
    name: layerData.name,
    layer: layerData.layer,
    pathLayout: layerData.pathLayout,
    edges:
      (layerData.edges &&
        layerData.edges.reduce((output, edge) => {
          output.push(sanitizeEdge(edge));
          return output;
        }, [])) ||
      [],
    nodes:
      (layerData.nodes &&
        layerData.nodes.reduce((output, node) => {
          output.push(sanitizeNode(node));
          return output;
        }, [])) ||
      [],
  };
};