import { Router, Request, Response, NextFunction } from 'express';

export class GenericRouter {

    router: Router;

    constructor() {
        this.router = Router();
    }

    protected sendErrorResponse = (res: Response, statusCode: number, message: string): void => {
        res.status(statusCode).send({
            //message: errorHandler.getErrorMessage(err)
            message: message
        });
    }
}

export default GenericRouter;