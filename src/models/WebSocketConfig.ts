export default class WebSocketConfig {
    private readonly  server:any;
    private path:string;

    public constructor(server:any) {
        this.server = server;
    }

    public setPath(path:string):WebSocketConfig {
        this.path = path;
        return this;
    }

    public getServer():any {
        return this.server;
    }

    public getPath():string {
        return this.path;
    }
}