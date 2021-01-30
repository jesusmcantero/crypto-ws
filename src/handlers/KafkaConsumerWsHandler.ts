import LogService from "ms-common-services/lib/services/LogService";
import KafkaConsumerService from "ms-common-services/lib/services/KafkaConsumerService";
import KafkaMessage from "ms-common-services/lib/models/KafkaMessage";

import BaseWebSocketHandler from "./BaseWebSocketHandler";

export default class KafkaConsumerWsHandler extends BaseWebSocketHandler {

    constructor() {
        super();
    }

    protected initHandlerActions() {
        this.initKafkaConsumer();
    }

    protected onWSMessagee(message:string) {
        LogService.getInstance().log('NotificiationWSHandler.onWSMessagee: ' + message);
        this.ws.send(`Hello, you sent -> ${message}`);
    }

    protected initKafkaConsumer(){
        KafkaConsumerService.createNewInstance(this.setup.kafka.connection.key, this.setup.kafka.connection.setup).addConsumer(this.setup.kafka.topic, this);
    }

    onError(err: any): any { }

    onMessage(message: KafkaMessage): any {
        this.ws.send(JSON.stringify(message));
    }
}