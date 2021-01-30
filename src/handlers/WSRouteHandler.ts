import WebSocketService from "../services/WebSocketService";

export default class WSRouteHandler {
    setup:any;
    public constructor(server:any, setup:any) {
        this.setup = setup;
        this.initHandlerPath(server);
    }

    protected initHandlerPath(server:any) {
        server.get(this.setup.path, { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
            console.log('test1');
            WebSocketService.getInstance().initInstanceByHandlerType(this.setup).setupHandler(connection.socket, this.setup).initHandler();
            console.log('test2');
        });
    }
}