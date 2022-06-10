export class PrivateMessageBus {
    constructor(busScope){
        this.topics = {}
        this.lastEvents = {}
        this.instanceId = Math.random().toString(16).substr(2, 8);
        console.debug("instantiating bus with ID #"+this.instanceId);
        if(busScope){
            busScope.__privatemessagebus__ = this;
            busScope.addEventListener("$SCOPE.DISCOVERY$", (event)=>{
                event.callback && event.callback(busScope.__privatemessagebus__);
                event.stopPropagation();
            })
        }
    }
}

PrivateMessageBus.prototype.subscribe = function(topic, callback, context){
    var privateBus = null;
    if(context && context.dispatchEvent){
        var discoveryEvent = new CustomEvent("$SCOPE.DISCOVERY$", {bubbles: true, cancelable: true, composed: true});
        discoveryEvent.callback = function(bus){ 
            privateBus = bus;
        }
        context.dispatchEvent(discoveryEvent);
    }
    if(privateBus === null){
        privateBus = this;
    }

    // use toLocaleString as a (good) approximation of a unique hash so we don't
    // resubscribe to the same topic on code load over and over.
    var hash = callback.toLocaleString();
    if(!context){
        context = this;
    }
    if(!privateBus.topics[topic]){
        privateBus.topics[topic] = {hash: {"callback": callback, "context":context }};
    } else {
        privateBus.topics[topic][hash] = {"callback": callback, "context":context };
    }
}

PrivateMessageBus.prototype.publish = function(topic, eventData, context){
    var privateBus = null;
    if(context){
        var discoveryEvent = new CustomEvent("$SCOPE.DISCOVERY$", {bubbles: true, cancelable: true, composed: true});
        discoveryEvent.callback = function(bus){ 
            privateBus = bus;
        }
        context.dispatchEvent(discoveryEvent);
    }

    var scopeMessage = "";
    if(!!privateBus){
        scopeMessage = "scoped to PrivateMessageBus #"+privateBus.instanceId;
    }
    if(!privateBus){
        privateBus = this;
        scopeMessage = "on the global bus with ID #"+privateBus.instanceId
    }
    console.debug("publishing event on topic", topic, scopeMessage);
    privateBus.lastEvents[topic] = eventData;
    var subscriberData = privateBus.topics[topic];
    if (!subscriberData) return;
    var subscribers = Object.values(subscriberData);
    for(var i=0; subscribers && i<subscribers.length; i++){
        // use javascript's 'call' property on functions to reassign "this" to "context"
        subscribers[i]["callback"].call(subscribers[i]["context"], eventData);
    }
}

PrivateMessageBus.prototype.clearAllCallbacks = function() {
    console.debug("destroying all callbacks");
    var keys = Object.keys(this.topics);
    for(var i=0; i<keys.length; i++){
        this.topics[keys[i]] = {};
    }
};

PrivateMessageBus.prototype.clearTopicCallbacks = function(topic) {
    console.debug("destroying callbacks on topic '"+topic+"'");
    if(this.topics[topic]) this.topics[topic] = {};
};

// returns the last eventData value for a particular topic
PrivateMessageBus.prototype.last = function(topic){
    return this.lastEvents[topic];
}

var messageBus = null;

export function getInstance() {
    if(!messageBus){
        messageBus = new PrivateMessageBus();
    }
    return messageBus;
}
export var PubSub = getInstance();
try {
    module.exports.PubSub = getInstance();    
    exports.PubSub = getInstance();    
} catch (e) {
    console.error(e)
}
