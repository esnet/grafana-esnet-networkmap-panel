class PrivateMessageBus {
    constructor(){
        this.topics = {}
        this.lastEvents = {}
    }
}

PrivateMessageBus.prototype.subscribe = function(topic, callback, context){
    // use toLocaleString as a (good) approximation of a unique hash so we don't
    // resubscribe to the same topic on code load over and over.
    var hash = callback.toLocaleString();
    if(!context){
        context = this;
    }
    if(!this.topics[topic]){
        this.topics[topic] = {hash: {"callback": callback, "context":context }};
    } else {
        this.topics[topic][hash] = {"callback": callback, "context":context };
    }
}

PrivateMessageBus.prototype.publish = function(topic, eventData){
    console.log("publishing event on topic", topic);
    this.lastEvents[topic] = eventData;
    var subscriberData = this.topics[topic];
    if (!subscriberData) return;
    var subscribers = Object.values(subscriberData);
    for(var i=0; subscribers && i<subscribers.length; i++){
        // use javascript's 'call' property on functions to reassign "this" to "context"
        subscribers[i]["callback"].call(subscribers[i]["context"], eventData);
    }
}

PrivateMessageBus.prototype.clearAllCallbacks = function() {
    console.log("destroying all callbacks");
    var keys = Object.keys(this.topics);
    for(var i=0; i<keys.length; i++){
        this.topics[keys[i]] = {};
    }
};

PrivateMessageBus.prototype.clearTopicCallbacks = function(topic) {
    console.log("destroying callbacks on topic '"+topic+"'");
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
    console.log(e)
}
