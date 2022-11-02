import * as pubsub from '../src/components/lib/pubsub.js';
const PrivateMessageBus = pubsub.PrivateMessageBus;
const PubSub = pubsub.PubSub;

describe( "PubSub Module", () => {
    it("should have a global bus", ()=>{
        PubSub.global.publish.should.be.a.Function;
        PubSub.global.subscribe.should.be.a.Function;
        PubSub.global.last.should.be.a.Function;
        PubSub.global.clearLast.should.be.a.Function;
        PubSub.global.clearAllCallbacks.should.be.a.Function;
        PubSub.global.clearTopicCallbacks.should.be.a.Function;
    });
    it("should have local busses, bound to html elements", ()=>{
        var elem = document.createElement("div");
        var bus = new PrivateMessageBus(elem);
        bus.should.be.an.instanceOf(PrivateMessageBus);
    });
    it("should implement a private message bus bound to an HTML element", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem);
        var privateTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.publish("test", "value", elem);
        (String(privateTestValue)).should.equal("value");
    });
    it("should allow users to supply a 'debug' parameter when instantiating the bus", ()=>{
        var oldDebug = console.debug;
        var called = false;
        console.debug = function(){ called = true; oldDebug.apply(console, arguments); }
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        called.should.equal(true);
        console.debug = oldDebug;
    });
    it("should users to set a 'debug' attribute on the global bus", ()=>{
        var oldDebug = console.debug;
        var called = false;
        console.debug = function(){ called = true; oldDebug.apply(console, arguments); }
        PubSub.global.setDebug(true);
        PubSub.global.publish("test", "value");
        called.should.equal(true);
        console.debug = oldDebug;
    });
    it("should implement a global message bus in the module scope", ()=>{
        var globalTestValue = null;
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value");
        (String(globalTestValue)).should.equal("value");
    });
    it("should not 'hear' local bus events on the global bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value", elem);
        (String(privateTestValue)).should.equal("value");
        (String(globalTestValue)).should.equal("null");
    });
    it("should not 'hear' global bus events on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.global.publish("test", "value");
        (String(privateTestValue)).should.equal("null");
        (String(globalTestValue)).should.equal("value");
    });
    it("should return the 'last' value for an event on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        PubSub.last("test", elem).should.equal("value");
    })
    it("should return the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        PubSub.global.last("test").should.equal("value");
    })
    it("should allow users to clear the 'last' value for an event on a local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        PubSub.last("test", elem).should.equal("value");
        PubSub.clearLast("test", elem);
        String(PubSub.last("test", elem)).should.equal("null");
    })
    it("should allow users to clear the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        PubSub.global.last("test").should.equal("value");
        PubSub.global.clearLast("test");
        String(PubSub.global.last("test")).should.equal("null");        
    })
})