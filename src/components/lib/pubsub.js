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

function discoverBusAbove(context, defaultBus){
    var messageBus = defaultBus;

    if(context && context.dispatchEvent){
        var discoveryEvent = new CustomEvent("$SCOPE.DISCOVERY$", {bubbles: true, cancelable: true, composed: true});
        discoveryEvent.callback = function(bus){ 
            messageBus = bus;
        }
        context.dispatchEvent(discoveryEvent);
    }

    return messageBus;
}

PrivateMessageBus.prototype.subscribe = function(topic, callback, context){
    var messageBus = discoverBusAbove(context, this);

    // use toLocaleString as a (good) approximation of a unique hash so we don't
    // resubscribe to the same topic on code load over and over.
    var hash = callback.toLocaleString();
    if(!context){
        context = this;
    }
    if(!messageBus.topics[topic]){
        messageBus.topics[topic] = {hash: {"callback": callback, "context":context }};
    } else {
        messageBus.topics[topic][hash] = {"callback": callback, "context":context };
    }
}

PrivateMessageBus.prototype.publish = function(topic, eventData, context){
    var messageBus = discoverBusAbove(context, this);

    var scopeMessage = "scoped to PrivateMessageBus #"+messageBus.instanceId;
    if(messageBus.instanceId === this.instanceId){
        scopeMessage = "on the global bus with ID #"+messageBus.instanceId;
    }
    console.debug("publishing event on topic", topic, scopeMessage);
    messageBus.lastEvents[topic] = eventData;
    var subscriberData = messageBus.topics[topic];
    if (!subscriberData) return;
    var subscribers = Object.values(subscriberData);
    for(var i=0; subscribers && i<subscribers.length; i++){
        // use javascript's 'call' property on functions to reassign "this" to "context"
        subscribers[i]["callback"].call(subscribers[i]["context"], eventData);
    }
}

PrivateMessageBus.prototype.clearAllCallbacks = function(context) {
    var messageBus = discoverBusAbove(context, this);
    console.debug("destroying all callbacks");
    var keys = Object.keys(this.topics);
    for(var i=0; i<keys.length; i++){
        messageBus.topics[keys[i]] = {};
    }
};

PrivateMessageBus.prototype.clearTopicCallbacks = function(topic, context) {
    var messageBus = discoverBusAbove(context, this);
    console.debug("destroying callbacks on topic '"+topic+"'");
    if(messageBus.topics[topic]) this.topics[topic] = {};
};

// returns the last eventData value for a particular topic
PrivateMessageBus.prototype.last = function(topic, context){
    var messageBus = discoverBusAbove(context, this);
    console.log("returning last value for", topic, messageBus.lastEvents[topic], "from bus with id #", messageBus.instanceId);
    return messageBus.lastEvents[topic];
}
// clears the last eventData value for a particular topic
PrivateMessageBus.prototype.clearLast = function(topic, context){
    var messageBus = discoverBusAbove(context, this);
    return messageBus.lastEvents[topic] = null;
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
    console.debug(e)
}
