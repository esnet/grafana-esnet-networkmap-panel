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
          latLngs: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
          meta: {
            type: 'object',
            properties: { endpoint_identifiers: { type: 'object' } },
          },
        },
        required: ['name', 'latLngs', 'meta'],
      },
    },
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          latLng: { type: 'array', items: { type: 'number' } },
        },
        required: ['name', 'latLng'],
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
  var output = { "valid": true, "errorDetails": {} }
  const typeCheckers = {
    'object': (data)=>{ return typeof(data) === "object"; },
    'number': (data)=>{ return typeof(data) === "number" },
    'string': (data)=>{ return typeof(data) === "string" || data instanceof String; },
    'boolean': (data)=>{ return typeof(data) === 'boolean' },
    'null': (data)=>{ return data === null },
    'array': Array.isArray
  }
  if(!typeCheckers[schema['type']](data)){
    var before = output['valid'];
    output["valid"] = false;
    output.errorDetails[''] = "type check failed."
    return output;
  }
  // recursive call for each property listed above
  var props = schema.properties ? Object.keys(schema.properties) : [];
  for(var i=0; i<props.length; i++){
      var propName = props[i];
      if(!data[propName] && schema.required.indexOf(propName)>=0){
        var before = output['valid'];
        output['valid'] = false;
        output['errorDetails'][propName] = "required property '"+propName+"' is not set";
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
      var before = output['valid'];
      output['valid'] = !!(valid && output['valid']);
      Object.keys(errorDetails).forEach((childProp)=>{
        var accessor = childProp == "" ? propName : propName + "." + childProp;
        output['errorDetails'][accessor] = errorDetails[childProp];
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
