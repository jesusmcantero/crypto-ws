import * as fs from "fs";

import LogService from "ms-common-services/lib/services/LogService";
import VaultConfig from "ms-common-services/lib/models/VaultConfig";
import VaultConfigApi from "ms-common-services/lib/models/VaultConfigApi";
import VaultConfigAuthConfig from "ms-common-services/lib/models/VaultConfigAuthConfig";
import VaultService from "ms-common-services/lib/services/VaultService";
import VaultConfigAuth from "ms-common-services/lib/models/VaultConfigAuth";

const dependingServicesPath:string = process.env.DEPENDING_SERVICE_JSON;
let kafkaConfig:any;
let wsSetup:Array<any>;
let rawdata = fs.readFileSync(dependingServicesPath);
let config = JSON.parse(rawdata.toString());

let vaultConfig:VaultConfig = new VaultConfig().setApi(new VaultConfigApi().setUrl(process.env.VAULT_URL)).setAuth(new VaultConfigAuth().setType(process.env.VAULT_AUTH_TYPE).setConfig(new VaultConfigAuthConfig().setRoleId(config.vault_role_id).setSecretId(config.vault_role_secret)));


import fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import fastifyWebSocket from 'fastify-websocket';
import WSRouteHandler from "./handlers/WSRouteHandler";

const server = fastify();

server.register(fastifyBlipp);
server.register(fastifyWebSocket, {
    options: { maxPayload: 1048576 }
});

const start = async () => {
    VaultService.createInstance(process.env.VAULT_SECRET_KEY, vaultConfig).readSecret(process.env.VAULT_SECRET_PATH_KAFKA).then((kafkaSecretValue:any) => {
        kafkaConfig = JSON.parse(kafkaSecretValue.__data.kafka);
        VaultService.getInstanceByKey(process.env.VAULT_SECRET_KEY).readSecret(process.env.VAULT_SECRET_PATH_WS_SETUP_PATH).then((wsSetupData: any) => {
            wsSetup = JSON.parse(wsSetupData.__data.paths);
            LogService.getInstance().log('wsSetup: ' + JSON.stringify(wsSetup));
            wsSetup?.map( async setup => {
                setup.kafka.connection = kafkaConfig;
                LogService.getInstance().log('setup: ' + JSON.stringify(setup));
                new WSRouteHandler(server, setup);
                await server.listen(8999, "0.0.0.0");
                server.blipp();
            })
        })
    })
};

process.on("uncaughtException", error => {
    console.error(error);
});
process.on("unhandledRejection", error => {
    console.error(error);
});

start().then();