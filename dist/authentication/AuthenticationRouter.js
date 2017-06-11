"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericRouter_1 = require("../common/GenericRouter");
const AuthenticationController_1 = require("./AuthenticationController");
const ExtendedError_1 = require("../common/ExtendedError");
class AuthenticationRouter extends GenericRouter_1.default {
    /**
     * Initialize the UserRouter
     */
    constructor() {
        super();
        /**
        * POST /api/authetication.
        */
        this.getToken = (req, res, next) => {
            const userData = req.body;
            try {
                //checkear datos de entrada obligatorios
                if (!userData.name) {
                    throw new ExtendedError_1.default('Debe introducir name', 400);
                }
                if (!userData.password) {
                    throw new ExtendedError_1.default('Debe introducir password', 400);
                }
                AuthenticationController_1.default.getToken(userData.name, userData.password).then(token => {
                    res.send({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }).catch(ee => {
                    this.sendErrorResponse(res, ee.statusCode, ee.message);
                });
            }
            catch (ee) {
                this.sendErrorResponse(res, ee.statusCode, ee.message);
            }
        };
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
}
exports.AuthenticationRouter = AuthenticationRouter;
// Create the AuthenticationRouter, and export its configured Express.Router
const authenticationRouter = new AuthenticationRouter();
authenticationRouter.init();
exports.default = authenticationRouter.router;
