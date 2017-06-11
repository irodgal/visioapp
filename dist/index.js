"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dotenv = require("dotenv");
const config = require("./config");
const app = require("./app");
//Later in your code
dotenv.config();
config.default.init();
let port = process.env.PORT ? process.env.PORT : 3000;
const server = http.createServer(app.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    throw error;
}
function onListening() {
    console.log('Listening on port ' + server.address().port);
}
