"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthenticationRouter_1 = require("./authentication/AuthenticationRouter");
class app {
    //Run configuration methods on the Express instance.
    constructor() {
        this.middleware = () => {
            this.express.use(bodyParser.json());
            this.express.use(bodyParser.urlencoded({ extended: false }));
            this.express.use(methodOverride());
        };
        //rutas fuera del control del token
        this.routesOutOfTokenControl = () => {
            this.express.use('/api/authentication', AuthenticationRouter_1.default);
        };
        this.middlewareTokenControl = () => {
            var apiRoutes = express.Router();
            apiRoutes.use((req, res, next) => {
                // check header or url parameters or post parameters for token
                var token = req.body.token || req.query.token || req.headers['x-access-token'];
                // decode token
                if (token) {
                    try {
                        //shhhhh es el supersecret
                        const decoded = jsonwebtoken_1.verify(token, process.env.jsonwebtoken_super_secret);
                        //req.decoded = decoded; //¿¿??
                        next();
                    }
                    catch (err) {
                        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                            return res.status(419).send({
                                success: false,
                                message: 'Failed to authenticate token.',
                                desc: err.message
                            });
                        }
                        else {
                            return res.status(401).send({
                                success: false,
                                message: 'Failed to authenticate token.',
                                desc: err.message
                            });
                        }
                    }
                }
                else {
                    // if there is no token
                    // return an error
                    return res.status(401).send({
                        success: false,
                        message: 'No token provided.'
                    });
                }
            });
            this.express.use('/api', apiRoutes);
        };
        // Configure API endpoints.
        this.routes = () => {
            /* This is just to get up and running, and to make sure what we've got is
            * working so far. This function will change when we start to add more
            * API endpoints */
            // let router = express.Router();
            // // placeholder route handler
            // router.get('/', (req, res, next) => {
            //   res.json({
            //     message: 'Hello World!'
            //   });
            // });
            // this.express.use('/', router);
            //aqui se va cargando cada router para el api
            //this.express.use('/api/heroes', HeroRouter);
            //this.express.use('/api', ApiRouter);
        };
        this.express = express();
        this.middleware();
        this.routesOutOfTokenControl();
        this.middlewareTokenControl();
        this.routes();
    }
}
exports.default = new app().express;
