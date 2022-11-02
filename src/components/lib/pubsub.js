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
    var scopeMessage = "scoped to bus with id #" + messageBus.instanceId;
    if(messageBus.debug){
        console.debug("publishing event on topic", topic, scopeMessage);
    }
    //messageBus.lastEvents[topic] = ;
    localStorage.setItem(`${messageBus.instanceId}.lastEvents.${topic}`, JSON.stringify(eventData));
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
    var keys = Object.keys(this.topics);
    for(var i=0; i<keys.length; i++){
        messageBus.topics[keys[i]] = {};
    }
}

const doClearTopicCallbacks = (topic, messageBus)=>{
    if(messageBus.debug){
        console.debug("destroying callbacks on topic '"+topic+"'");
    }
    if(messageBus.topics[topic]) this.topics[topic] = {};
}

const getLastValue = (topic, messageBus)=>{
    if(messageBus.debug){
        console.debug("returning last value for", topic, "from bus with id #", messageBus.instanceId);
    }
    return JSON.parse(localStorage.getItem(`${messageBus.instanceId}.lastEvents.${topic}`));
}

const clearLastValue = (topic, messageBus)=>{
    if(messageBus.debug){
        console.debug("clearing last value for", topic, "from bus with id #", messageBus.instanceId);
    }
    localStorage.removeItem(`${messageBus.instanceId}.lastEvents.${topic}`);
}

export class PrivateMessageBus {
    constructor(busScope, debug){
        this.instanceId = "global";
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
        if(this.debug){
            console.debug("instantiating bus with ID #"+this.instanceId);
        }
        function setID(busScope){
            //debugger;
            if(!busScope.isConnected){
                window.setTimeout(()=>{ setID(busScope) }, 100);
                return
            }
            var currNode = busScope;
            var path = "";
            while(currNode.parentNode.parentNode != null){
                for(var i=0; i<currNode.parentNode.children.length; i++){
                    if(currNode.parentNode.children[i] == currNode){
                        path = `[${i}]` + path;
                        break;
                    }
                }
                path = currNode.parentNode.tagName + path
                currNode = currNode.parentNode;
            }
            this.instanceId = sumChars(path).toString(4).substr(0,16);
        }
        if(busScope){
            if(!!busScope.isConnected){ // if our html element to be used as a bus is connected to the dom
                setID(busScope);
            } else {
                window.setTimeout(()=>{ setID.call(this, busScope) }, 100)
            }
            busScope.__privatemessagebus__ = this;
            busScope.addEventListener("$SCOPE.DISCOVERY$", (event)=>{
                event.callback && event.callback(busScope.__privatemessagebus__);
                event.stopPropagation();
            })
        }
    }
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
