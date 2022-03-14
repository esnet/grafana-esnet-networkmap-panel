window.__pubsub = {
    "topics": {
    },
    "subscribe": function(topic, callback){
        // use toLocaleString as a (good) approximation of a unique hash so we don't
        // resubscribe to the same topic on code load over and over.
        var hash = callback.toLocaleString();
        if(!window.__pubsub.topics[topic]){
            window.__pubsub.topics[topic] = {hash: callback}
        } else {
            window.__pubsub.topics[topic][hash] = callback;
        }
    },
    "publish": function(topic, eventData){
        console.log("publishing event", eventData, "on topic", topic);
        var subscribers = Object.values(window.__pubsub.topics[topic]);
        for(var i=0; subscribers && i<subscribers.length; i++){
            subscribers[i](eventData);
        }
    }
}
