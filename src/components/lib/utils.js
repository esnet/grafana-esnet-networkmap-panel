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

export function deepJsonFix(value, path = "") {
  // If it's an array, recurse into each element
  if (Array.isArray(value)) {
    return value.map((v, i) => deepJsonFix(v, `${path}[${i}]`));
  }

  // If it's an object, recurse into its keys
  if (value && typeof value === "object") {
    for (const k of Object.keys(value)) {
      value[k] = deepJsonFix(value[k], `${path}.${k}`);
    }
    return value;
  }

  // If it's a string, see if it should be parsed
  if (typeof value === "string") {
    const trimmed = value.trim();

    // Detect destroyed objects
    if (trimmed === "[object Object]") {
      console.warn(`Lost JSON at ${path} → "[object Object]"`);
      return null;
    }

    // Try to parse valid JSON strings
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      try {
        return deepJsonFix(JSON.parse(trimmed), path);
      } catch {
        return value;
      }
    }
  }

  return value;
}

try {
  const Utils = {
    getUrlSearchParams,
    schema,
    validateArray,
    validate,
    testJsonSchema,
    resolvePath,
    setPath,
    deepJsonFix,
  }
  module.exports.Utils = Utils;
  exports.Utils = Utils;
} catch (e) {
}

export function formatBits(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1000
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['b/s', 'Kb/s', 'Mb/s', 'Gb/s', 'Tb/s', 'Pb/s', 'Eb/s', 'Zb/s', 'Yb/s']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}