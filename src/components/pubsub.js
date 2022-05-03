class PrivateMessageBus {
    constructor(){
        this.topics = {}
        this.lastEvents = {}
    }
}

PrivateMessageBus.prototype.subscribe = function(topic, callback){
    // use toLocaleString as a (good) approximation of a unique hash so we don't
    // resubscribe to the same topic on code load over and over.
    var hash = callback.toLocaleString();
    if(!this.topics[topic]){
        this.topics[topic] = {hash: callback}
    } else {
        this.topics[topic][hash] = callback;
    }
}

PrivateMessageBus.prototype.publish = function(topic, eventData){
    console.log("publishing event on topic", topic);
    this.lastEvents[topic] = eventData;
    var subscriberData = this.topics[topic];
    if (!subscriberData) return;
    var subscribers = Object.values(subscriberData);
    for(var i=0; subscribers && i<subscribers.length; i++){
        subscribers[i](eventData);
    }
}

PrivateMessageBus.prototype.clearAllCallbacks = function() {
    console.log("destroying all callbacks");
    var keys = Object.keys(this.topics);
    for(var i=0; i<keys.length; i++){
        this.topics[keys[i]] = {};
    }
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
