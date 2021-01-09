import * as WebSocket from "ws";
import KafkaConsumerHandler from "ms-common-services/lib/services/KafkaConsumerHandler";

export default abstract class BaseWebSocketHandler extends KafkaConsumerHandler{
    protected ws:WebSocket;

    public initWSConnection(ws:WebSocket):BaseWebSocketHandler {
        this.ws = ws;
        //connection is up, let's add a simple simple event
        this.ws.on('message', (message: string) => {
            this.onWSMessagee(message);
        });
        return this;
    }

    protected abstract onWSMessagee(message:string);
}