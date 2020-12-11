import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import WebSocketService from "./services/WebSocketService";
import LogService from "ms-common-services/lib/services/LogService";

const app = express();
const wsSetup = require("./config/ws_path_config.json")
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
wsSetup?.map( setup => {
    const wss = new WebSocket.Server({ server : server, path : setup.path});

    wss.on('connection', (ws: WebSocket) => {
        LogService.getInstance().log('wss.on.connection1');
        WebSocketService.getInstance().initInstanceByHandlerType(setup.handler).initWSConnection(ws);
        LogService.getInstance().log('wss.on.connection2');
    });
})


//start our server
server.listen( 8999, () => {
    console.log(`Server started on port 8999:)`);
});