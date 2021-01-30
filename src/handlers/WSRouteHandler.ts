import WebSocketService from "../services/WebSocketService";

export default class WSRouteHandler {
    private setup:any;

    public constructor(server:any, setup:any) {
        this.setup = setup;
        this.initHandlerPath(server);
    }

    protected initHandlerPath(server:any) {
        server.get(this.setup.path, { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
            WebSocketService.getInstance().initInstanceByHandlerType(this.setup).setupHandler(connection.socket, this.setup).initHandler();
        });
    }
}