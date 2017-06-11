import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import { verify, TokenExpiredError } from 'jsonwebtoken';

import config from "./config";
import AuthenticationRouter from './authentication/AuthenticationRouter';

class app {
    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();

        this.middleware();
        this.routesOutOfTokenControl();
        this.middlewareTokenControl();
        this.routes();
    }

    private middleware = (): void => {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(methodOverride());
    }

    //rutas fuera del control del token
    private routesOutOfTokenControl = (): void => {
        this.express.use('/api/authentication', AuthenticationRouter);
    }

    private middlewareTokenControl = (): void => {
        var apiRoutes = express.Router();
        apiRoutes.use((req, res, next) => {
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            // decode token
            if (token) {
                try {
                    //shhhhh es el supersecret
                    const decoded = verify(token, process.env.jsonwebtoken_super_secret);
                    //req.decoded = decoded; //¿¿??
                    next();
                } catch (err) {
                    if (err instanceof TokenExpiredError) {
                        return res.status(419).send({
                            success: false,
                            message: 'Failed to authenticate token.',
                            desc: err.message
                        });
                    } else {
                        return res.status(401).send({
                            success: false,
                            message: 'Failed to authenticate token.',
                            desc: err.message
                        });
                    }
                }
            } else {
                // if there is no token
                // return an error
                return res.status(401).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });
        this.express.use('/api', apiRoutes);
    }


    // Configure API endpoints.
    private routes = (): void => {
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
    }
}

export default new app().express;