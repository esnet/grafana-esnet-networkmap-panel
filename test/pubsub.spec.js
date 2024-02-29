import * as pubsub from '../src/components/lib/pubsub.js';
import { expect, vi, describe } from 'vitest';
const PrivateMessageBus = pubsub.PrivateMessageBus;
const PubSub = pubsub.PubSub;

describe( "PubSub Module", () => {
    it("should have a global bus", ()=>{
        expect(PubSub.global.publish).toBeInstanceOf(Function);;
        expect(PubSub.global.subscribe).toBeInstanceOf(Function);
        expect(PubSub.global.last).toBeInstanceOf(Function);
        expect(PubSub.global.clearLast).toBeInstanceOf(Function);
        expect(PubSub.global.clearAllCallbacks).toBeInstanceOf(Function);
        expect(PubSub.global.clearTopicCallbacks).toBeInstanceOf(Function);
    });
    it("should have local busses, bound to html elements", () => {
        var elem = document.createElement("div");
        var bus = new PrivateMessageBus(elem);
        expect(bus).toBeInstanceOf(PrivateMessageBus);
    });
    it("should implement a private message bus bound to an HTML element", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem);
        var privateTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.publish("test", "value", elem);
        expect(`${privateTestValue}`).toEqual("value");
    });
    it("should allow users to supply a 'debug' parameter when instantiating the bus", () => {
        let consoleDebug = console.debug;
        const spy = vi.spyOn(console, "debug").mockImplementation((args) => consoleDebug(args));
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(spy).toHaveBeenCalled();
    });
    it("should users to set a 'debug' attribute on the global bus", ()=>{
        let consoleDebug = console.debug;
        const spy = vi.spyOn(console, "debug").mockImplementation((args) => consoleDebug(args));
        PubSub.global.setDebug(true);
        PubSub.global.publish("test", "value");
        expect(spy).toHaveBeenCalled();
    });
    it("should implement a global message bus in the module scope", ()=>{
        var globalTestValue = null;
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value");
        expect(`${globalTestValue}`).to.equal("value");
    });
    it("should not 'hear' local bus events on the global bus", () => {
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.publish("test", "value", elem);
        expect(`${privateTestValue}`).to.equal("value");
        expect(`${globalTestValue}`).to.equal("null");
    });
    it("should not 'hear' global bus events on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        var privateTestValue = null;
        var globalTestValue = null;
        PubSub.subscribe("test", (value)=>{ privateTestValue = value; }, elem)
        PubSub.global.subscribe("test", (value)=>{ globalTestValue = value; })
        PubSub.global.publish("test", "value");
        expect(`${privateTestValue}`).to.equal("null");
        expect(`${globalTestValue}`).to.equal("value");
    });
    it("should return the 'last' value for an event on the local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(PubSub.last("test", elem)).to.equal("value");
    })
    it("should return the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        expect(PubSub.global.last("test")).to.equal("value");
    })
    it("should allow users to clear the 'last' value for an event on a local bus", ()=>{
        var elem = document.createElement("div");
        new PrivateMessageBus(elem, true);
        PubSub.publish("test", "value", elem);
        expect(PubSub.last("test", elem)).to.equal("value");
        PubSub.clearLast("test", elem);
        expect(`${PubSub.last("test", elem)}`).to.equal("null");
    })
    it("should allow users to clear the 'last' value for an event on the global bus", ()=>{
        PubSub.global.publish("test", "value");
        expect(PubSub.global.last("test")).to.equal("value");
        PubSub.global.clearLast("test");
        expect(`${PubSub.global.last("test")}`).to.equal("null");
    })
})