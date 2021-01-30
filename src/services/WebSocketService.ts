import LogService from "ms-common-services/lib/services/LogService";

import BaseWebSocketHandler from "../handlers/BaseWebSocketHandler";
import KafkaConsumerWsHandler from "../handlers/KafkaConsumerWsHandler";

export default class WebSocketService {
    private static serviceInstance:WebSocketService;

    public static getInstance():WebSocketService {
        if (!WebSocketService.serviceInstance) {
            WebSocketService.serviceInstance = new WebSocketService();
        }
        return WebSocketService.serviceInstance;
    }

    private constructor() { }

    public initInstanceByHandlerType(handlerSetup:any):BaseWebSocketHandler {
        return this.getNewHandlerInstanceByType(handlerSetup);
    }


    private getNewHandlerInstanceByType(handlerSetup:any):BaseWebSocketHandler {
        if (handlerSetup.handler.toLocaleLowerCase() === KafkaConsumerWsHandler.name.toLocaleLowerCase()){
            return new KafkaConsumerWsHandler();
        }
        throw new Error();
    }

}