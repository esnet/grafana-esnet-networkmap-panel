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

const validate = ajv.compile(schema);

export function testJsonSchema(data) {
  const valid = validate(data);
  if (valid) {
    return [true, 'valid'];
  } else {
    return [false, ajv.errorsText(validate.errors)];
  }
}
