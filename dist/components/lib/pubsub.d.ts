export function getInstance(): any;
export class PrivateMessageBus {
    constructor(busScope: any, debug: any);
    instanceId: string;
    debug: boolean;
    global: {
        subscribe: (topic: any, callback: any, context: any) => void;
        publish: (topic: any, data: any) => void;
        clearAllCallbacks: () => void;
        clearTopicCallbacks: (topic: any) => void;
        last: (topic: any) => any;
        clearLast: (topic: any) => void;
        setDebug: (debug: any) => void;
    };
    topics: {};
    lastEvents: {};
    setID(id: any, context: any): void;
    subscribe(topic: any, callback: any, context: any): void;
    publish(topic: any, eventData: any, context: any): void;
    clearAllCallbacks(context: any): void;
    clearTopicCallbacks(topic: any, context: any): void;
    last(topic: any, context: any): any;
    clearLast(topic: any, context: any): void;
    setDebug(debug: any, context: any): void;
}
export const PubSub: any;
//# sourceMappingURL=pubsub.d.ts.map