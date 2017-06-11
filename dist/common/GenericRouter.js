"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class GenericRouter {
    constructor() {
        this.sendErrorResponse = (res, statusCode, message) => {
            res.status(statusCode).send({
                //message: errorHandler.getErrorMessage(err)
                message: message
            });
        };
        this.router = express_1.Router();
    }
}
exports.GenericRouter = GenericRouter;
exports.default = GenericRouter;
