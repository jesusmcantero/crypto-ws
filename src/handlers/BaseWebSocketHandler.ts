import * as WebSocket from "ws";
import KafkaConsumerHandler from "ms-common-services/lib/services/KafkaConsumerHandler";

export default abstract class BaseWebSocketHandler extends KafkaConsumerHandler{
    protected ws:WebSocket;

    public initWSConnection(ws:WebSocket):BaseWebSocketHandler {
        this.ws = ws;
        let icont = 0;
        //connection is up, let's add a simple simple event
        this.ws.on('message', (message: string) => {
            //log the received message and send it back to the client
            this.onWSMessagee(message);
        });
        // setInterval(() => {
        //     this.ws.send('Interval ' + icont);
        //     icont++;
        // }, 1000);
        //send immediatly a feedback to the incoming connection
        this.ws.send('Hi there, I am a WebSocket server');
        console.log('ws: ' + JSON.stringify(Object.keys(ws)));
        return this;
    }

    protected abstract onWSMessagee(message:string);
}