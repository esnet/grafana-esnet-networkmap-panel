const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    nodes: {
      type: 'object',
      properties: {},
    },
    edges: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        latLngs: { type: 'array', items: { type: 'number' } },
        meta: {
          type: 'object',
          properties: { endpoint_identifiers: { type: 'object' } },
        },
      },
      required: ['name', 'latLngs', 'meta'],
    },
    nodes: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        latLngs: { type: 'array', items: { type: 'number' } },
      },
      required: ['name', 'latLngs'],
    },
  },
  required: ['edges', 'nodes'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export function testJsonSchema(data) {
  const valid = validate(data);
  if (valid) {
    console.log('Valid!');
    return [true, 'valid'];
  } else {
    console.log('Invalid: ' + ajv.errorsText(validate.errors));
    return [false, ajv.errorsText(validate.errors)];
  }
}
