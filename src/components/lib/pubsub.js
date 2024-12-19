function sumChars(s) {
  var acc = 0;
  for (var i = 0; i < s.length; i++) {
    acc += s.charCodeAt(i);
      s.charCodeAt(i);
  }
  return acc;
}

function discoverBusAbove(context, defaultBus){
    var messageBus = defaultBus;
    if(context && context.__privatemessagebus__){
        return context.__privatemessagebus__;
    }
    if(context && context.dispatchEvent){
        var discoveryEvent = new CustomEvent("$SCOPE.DISCOVERY$", {bubbles: true, cancelable: true, composed: true});
        discoveryEvent.callback = function(bus){
            messageBus = bus;
        }
        context.dispatchEvent(discoveryEvent);
    }
    return messageBus;
}

const doSubscription = function(topic, callback, context, messageBus) {
    if(messageBus.debug){
        var scopeMessage = "for bus with id #" + messageBus.instanceId;
        console.debug("Received subscription to topic", topic, scopeMessage);
    }
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

const doPublish = function(topic, eventData, messageBus) {
    if(messageBus.debug){
        var scopeMessage = "scoped to bus with id #" + messageBus.instanceId;
        console.debug("publishing event on topic", topic, scopeMessage);
    }
    var accessor = `${messageBus.instanceId}.lastEvents.${topic}`;
    try {
        localStorage.setItem(accessor, JSON.stringify(eventData));
    } catch(e) {
        console.error(e);
        console.log("received error saving to localStorage. clearing localStorage.");
        localStorage.clear();
    }
    var subscriberData = messageBus.topics[topic];
    if (!subscriberData) return;
    var subscribers = Object.values(subscriberData);
    for(var i=0; subscribers && i<subscribers.length; i++){
        // use javascript's 'call' property on functions to reassign "this" to "context"
        subscribers[i]["callback"].call(subscribers[i]["context"], eventData);
    }

}

const doClearAllCallbacks = (messageBus)=>{
    if(messageBus.debug){
        console.debug("destroying all callbacks");
    }
    var keys = Object.keys(messageBus.topics);
    for(var i=0; i<keys.length; i++){
        messageBus.topics[keys[i]] = {};
    }
}

const doClearTopicCallbacks = (topic, messageBus)=>{
    if(messageBus.debug){
        console.debug("destroying callbacks on topic '"+topic+"'");
    }
    if(messageBus.topics[topic]) messageBus.topics[topic] = {};
}

const getLastValue = (topic, messageBus)=>{
    var accessor = `${messageBus.instanceId}.lastEvents.${topic}`
    if(messageBus.debug){
        console.debug("returning last value for", topic, "from bus with id #", messageBus.instanceId);
    }
    try {
        return JSON.parse(localStorage.getItem(`${messageBus.instanceId}.lastEvents.${topic}`));
    } catch(e) {
        return undefined;
    }
}

const clearLastValue = (topic, messageBus)=>{
    if(messageBus.debug){
        console.debug("clearing last value for", topic, "from bus with id #", messageBus.instanceId);
    }
    var accessor = `${messageBus.instanceId}.lastEvents.${topic}`;
    localStorage.removeItem(accessor);
}

export class PrivateMessageBus {
    constructor(busScope, debug){
        this.instanceId = Math.random().toString(16).substr(2, 8);
        const self = this;
        this.debug = false;
        if(debug){ this.debug = !!debug; }
        this.global = {
            subscribe: function(topic, callback, context){
                doSubscription.call(self, topic, callback, context, self);
            },
            publish: function(topic, data){
                doPublish.call(self, topic, data, self);
            },
            clearAllCallbacks: function(){
                doClearAllCallbacks(self);
            },
            clearTopicCallbacks: function(topic){
                doClearTopicCallbacks(topic, self);
            },
            last: function(topic){
                return getLastValue(topic, self);
            },
            clearLast: function(topic){
                return clearLastValue(topic, self);
            },
            setDebug: function(debug){
                self.debug = debug;
            }
        };
        this.topics = {};
        this.lastEvents = {};
        if(busScope){
            busScope.__privatemessagebus__ = this;
            busScope.addEventListener("$SCOPE.DISCOVERY$", (event)=>{
                event.callback && event.callback(busScope.__privatemessagebus__);
                event.stopPropagation();
            })
        }
        if(this.debug){
            console.debug("instantiating bus with ID #"+this.instanceId);
        }
    }
}

PrivateMessageBus.prototype.setID = function(id, context){
    var messageBus = discoverBusAbove(context, this)
if(messageBus.debug) console.debug(`resetting bus id from #${messageBus.instanceId} to #${id}`);
    messageBus.instanceId = id;
}

PrivateMessageBus.prototype.subscribe = function(topic, callback, context){
    var messageBus = discoverBusAbove(context, this)
    doSubscription.call(messageBus, topic, callback, context, messageBus);
}

PrivateMessageBus.prototype.publish = function(topic, eventData, context){
    var messageBus = discoverBusAbove(context, this);
    doPublish.call(messageBus, topic, eventData, messageBus);
}

PrivateMessageBus.prototype.clearAllCallbacks = function(context) {
    var messageBus = discoverBusAbove(context, this);
    doClearAllCallbacks(context, messageBus);
};

PrivateMessageBus.prototype.clearTopicCallbacks = function(topic, context) {
    var messageBus = discoverBusAbove(context, this);
    doClearTopicCallbacks(topic, messageBus);
};

// returns the last eventData value for a particular topic
PrivateMessageBus.prototype.last = function(topic, context){
    var messageBus = discoverBusAbove(context, this);
    return getLastValue(topic, messageBus);
}
// clears the last eventData value for a particular topic
PrivateMessageBus.prototype.clearLast = function(topic, context){
    var messageBus = discoverBusAbove(context, this);
    return clearLastValue(topic, messageBus);
}
PrivateMessageBus.prototype.setDebug = function(debug, context){
    var messageBus = discoverBusAbove(context, this);
    messageBus.debug = debug;
}

var messageBus = null;

export function getInstance() {
    if(!messageBus){
        messageBus = new PrivateMessageBus();
        messageBus.setID("global");
    }
    return messageBus;
}

export var PubSub = getInstance();

try {
    module.exports.PubSub = getInstance();
    exports.PubSub = getInstance();
} catch (e) {
}