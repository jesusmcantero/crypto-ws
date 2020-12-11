import BaseWebSocketHandler from "../handlers/BaseWebSocketHandler";
import NotificiationWSHandler from "../handlers/NotificiationWSHandler";
import LogService from "ms-common-services/lib/services/LogService";

export default class WebSocketService {
    private static serviceInstance:WebSocketService;
    private wsByHandleer:Map<String, BaseWebSocketHandler>;

    public static getInstance():WebSocketService {
        if (!WebSocketService.serviceInstance) {
            WebSocketService.serviceInstance = new WebSocketService();
        }
        return WebSocketService.serviceInstance;
    }

    private constructor() {
        this.wsByHandleer = new Map<String, BaseWebSocketHandler>();
    }

    public initInstanceByHandlerType(handlerType:string):BaseWebSocketHandler {
        this.isWShandlerReady();
        return this.getNewHandlerrInstanceByType(handlerType);
    }

    public getInstanceByHandlerTypee(handlerType:string):BaseWebSocketHandler {
        this.isWShandlerReady();
        return this.wsByHandleer.get(handlerType);
    }

    private isWShandlerReady() {
        if (!this.wsByHandleer) {
            throw new Error();
        }
    }
    private getNewHandlerrInstanceByType(handlerType:string):BaseWebSocketHandler {
        LogService.getInstance().log('getNewHandlerrInstanceByType.handlerType: ' + handlerType);
        if (handlerType.toLocaleLowerCase() === NotificiationWSHandler.name.toLocaleLowerCase()){
            LogService.getInstance().log('getNewHandlerrInstanceByType.handlerType.toLocaleLowerCase: ' + handlerType.toLocaleLowerCase());
            return new NotificiationWSHandler();
        }
        throw new Error();
    }

}