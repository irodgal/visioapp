import * as http from 'http';
import * as dotenv from 'dotenv';

import * as config from "./config";
import * as app from "./app";


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