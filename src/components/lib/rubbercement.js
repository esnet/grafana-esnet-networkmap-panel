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
            let [elem_id, event] = key.split("@");
            // use JS built-in 'apply' to set "this" keyword properly for callbacks.
            this.shadow.querySelector(elem_id)[event] = function(){ 
                bindings[key].apply(self, arguments) 
            };
        })
    }
}
