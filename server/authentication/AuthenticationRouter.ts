import { Request, Response, NextFunction } from 'express';

import GenericRouter from '../common/GenericRouter';
import authenticationController from './AuthenticationController';
import ExtendedError from '../common/ExtendedError';

interface UserData {
    name: string,
    password: string
    //lastName?: string
}

export class AuthenticationRouter extends GenericRouter {

    /**
     * Initialize the UserRouter
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //si le pusieramos algo mas despues del / lo uniria a /api/athentication
        this.router.post('/', this.getToken);
    }

    /**
    * POST /api/authetication.
    */
    public getToken = (req: Request, res: Response, next: NextFunction): void => {
        const userData: UserData = <UserData>req.body;

        try {
            //checkear datos de entrada obligatorios
            if (!userData.name) {
                throw new ExtendedError('Debe introducir name', 400);
            }

            if (!userData.password) {
                throw new ExtendedError('Debe introducir password', 400);
            }

            authenticationController.getToken(userData.name, userData.password).then(token => {
                res.send({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }).catch(ee => {
                this.sendErrorResponse(res, ee.statusCode, ee.message);
            });
        } catch (ee) {
            this.sendErrorResponse(res, ee.statusCode, ee.message);
        }
    }
}

// Create the AuthenticationRouter, and export its configured Express.Router
const authenticationRouter = new AuthenticationRouter();
authenticationRouter.init();

export default authenticationRouter.router;