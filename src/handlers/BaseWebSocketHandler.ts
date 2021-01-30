import KafkaConsumerHandler from "ms-common-services/lib/services/KafkaConsumerHandler";

export default abstract class BaseWebSocketHandler extends KafkaConsumerHandler{
    protected ws:any;
    protected setup:any;

    public setupHandler(ws:any, setup:any):BaseWebSocketHandler {
        this.ws = ws;
        this.setup = setup;
        this.initWSConnection();
        return this;
    }
    public initHandler():BaseWebSocketHandler {
        this.checkSetup();
        this.initHandlerActions();
        return this;
    }

    protected initWSConnection():BaseWebSocketHandler {
        this.checkSetup();
        //connection is up, let's add a simple simple event
        this.ws.on('message', (message: string) => {
            this.onWSMessagee(message);
        });
        return this;
    }
    protected checkSetup() {
        if (!this.ws) {
            throw new Error('No websocket setup');
        }
        if (!this.setup) {
            throw new Error('No setup value');
        }
    }

    protected abstract initHandlerActions();
    protected abstract onWSMessagee(message:string);

}