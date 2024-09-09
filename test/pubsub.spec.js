import * as pubsub from '../src/components/lib/pubsub.js';
const PrivateMessageBus = pubsub.PrivateMessageBus;
const PubSub = pubsub.PubSub;

describe( "PubSub Module", () => {
    it("should have a global bus", ()=>{
        expect(PubSub.global.publish).toBeDefined();
        expect(PubSub.global.subscribe).toBeDefined();
        expect(PubSub.global.last).toBeDefined();
        expect(PubSub.global.clearLast).toBeDefined();
        expect(PubSub.global.clearAllCallbacks).toBeDefined();
        expect(PubSub.global.clearTopicCallbacks).toBeDefined();
    });
    it("should have local busses, bound to html elements", ()=>{
        var elem = document.createElement("div");
        var bus = new PrivateMessageBus(elem);
        expect(bus instanceof PrivateMessageBus).toBeTruthy();
    });
    it("should implement a private message bus bound to an HTML element", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem);
        var privateTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.publish("test", "value", elem);
        expect(String(privateTestValue)).toEqual("value");
    });
    it("should allow users to supply a 'debug' parameter when instantiating the bus", ()=>{
        var oldDebug = console.debug;
        var called = false;
        console.debug = function(){ called = true; oldDebug.apply(console, arguments); }
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(called).toEqual(true);
        console.debug = oldDebug;
    });
    it("should users to set a 'debug' attribute on the global bus", ()=>{
        var oldDebug = console.debug;
        var called = false;
        console.debug = function(){ called = true; oldDebug.apply(console, arguments); }
        PubSub.global.setDebug(true);
        PubSub.global.publish("test", "value");
        expect(called).toEqual(true);
        console.debug = oldDebug;
    });
    it("should implement a global message bus in the module scope", ()=>{
        var globalTestValue = null;
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value");
        expect(String(globalTestValue)).toEqual("value");
    });
    it("should not 'hear' local bus events on the global bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value", elem);
        expect(String(privateTestValue)).toEqual("value");
        expect(String(globalTestValue)).toEqual("null");
    });
    it("should not 'hear' global bus events on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.global.publish("test", "value");
        expect(String(privateTestValue)).toEqual("null");
        expect(String(globalTestValue)).toEqual("value");
    });
    it("should return the 'last' value for an event on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(PubSub.last("test", elem)).toEqual("value");
    })
    it("should return the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        expect(PubSub.global.last("test")).toEqual("value");
    })
    it("should allow users to clear the 'last' value for an event on a local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(PubSub.last("test", elem)).toEqual("value");
        PubSub.clearLast("test", elem);
        expect(String(PubSub.last("test", elem))).toEqual("null");
    })
    it("should allow users to clear the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        expect(PubSub.global.last("test")).toEqual("value");
        PubSub.global.clearLast("test");
        expect(String(PubSub.global.last("test"))).toEqual("null");
    })
})