// minimal framework to make Web Components usable.
// v0.1
export class BindableHTMLElement extends HTMLElement {
    // syntactical sugar for event bindings to IDs
    bindEvents(bindings){
        let keys = Object.keys(bindings);
        let self = this;
        keys.forEach((key)=>{
            if(!bindings[key]){
                throw new Error(`Bad binding supplied for ${key}`)
            }
            let [selector, event] = key.split("@");
            // use JS built-in 'apply' to set "this" keyword properly for callbacks.
            let element = self.shadow.querySelector(selector)
            element[event] = function(){
                bindings[key].apply(self, arguments) 
            };
        })
    }
}

export const utils = {
    // excerpted from https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase-in-my-app
    "snakeToCamel": function(str){
      return str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
          .toUpperCase()
          .replace('-', '')
          .replace('_', '')
      );
    }
}


export const types = {
    "choiceAmong": function(choices, value){
      return choices.indexOf(value) >= 0;
    },
    "boolean": function(value){
        return choiceAmong(["true", 1, "yes", "True", true], value);
    },
    "string": function(value){
        return String(value);
    },
    "number": function(value){
        return Number(value);
    },
    "function": function(value){
        return value;
    }
}


const TEMPLATE_REGEX = /\${[^{}]+}/g;

// copied from Matt Browne's answer https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
// functions renamed slightly for readability

//get the specified property or nested property of an object
function resolveObjPath(path, obj, fallback = '') {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
}

export function render(template, variables, fallback) {
    return template.replace(TEMPLATE_REGEX, (match) => {
        const path = match.slice(2, -1).trim();
        return resolveObjPath(path, variables, fallback);
    });
}