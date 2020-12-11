import BaseWebSocketHandler from "./BaseWebSocketHandler";
import KafkaMessage from "ms-common-services/lib/models/KafkaMessage";
import KafkaConsumerService from "ms-common-services/lib/services/KafkaConsumerService";
import KafkaTopic from "ms-common-services/lib/models/KafkaTopic";
import LogService from "ms-common-services/lib/services/LogService";

const rateTrendChangeTopic:KafkaTopic = new KafkaTopic("rate-update", 1);

export default class NotificiationWSHandler extends BaseWebSocketHandler{
    constructor() {
        super();
        this.initKafkaConsumer();
    }

    protected onWSMessagee(message:string) {
        LogService.getInstance().log('NotificiationWSHandler.onWSMessagee: ' + message);
        this.ws.send(`Hello, you sent -> ${message}`);
    }
    protected initKafkaConsumer(){
        const kafkaConfig = require('../config/kafa_config.json');
        KafkaConsumerService.createNewInstance(kafkaConfig.key, kafkaConfig.setup);
        KafkaConsumerService.getInstanceByKey(kafkaConfig.key).addConsumer(rateTrendChangeTopic, this);
    }

    onError(err: any): any { }

    onMessage(message: KafkaMessage): any {
        LogService.getInstance().log('NotificiationWSHandler.onMessage: ' + JSON.stringify(message));
        this.ws.send(JSON.stringify(message));
    }

}