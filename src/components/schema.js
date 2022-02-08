const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true
})

const schema = {
  type: "object",
  properties: {
    name: {type: "string"
    },
    nodes: {
        type: "object", 
        properties: {}
    },
    edges: {
        type: "object", 
        properties: {
            name: {type: "string"
        },
            latLngs: {type: "array", items: {type: "number"
          }
        },
            meta: {
                type: "object", 
                properties: {endpoint_identifiers: {type: "object"
            }
          }
        }
      }
    }
  },
  required: [
    "edges",
    "nodes"
  ],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

test({foo: "abc", bar: 2
})
test({foo: 2, bar: 4
})

function test(data) {
  const valid = validate(data)
  if (valid) console.log("Valid!")
  else console.log("Invalid: " + ajv.errorsText(validate.errors))
}