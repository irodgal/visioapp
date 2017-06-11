"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto = require("crypto");
const config_1 = require("../config");
const ExtendedError_1 = require("../common/ExtendedError");
class AuthenticationController {
    constructor() {
        this.getEncryptedPassword = (password) => {
            var sha256 = crypto.createHash('sha256');
            return sha256.update(password).digest('base64');
        };
        this.getToken = (name, password) => {
            var token = config_1.default.clientDB.view('users', 'nombreView', { keys: [name] })
                .then(([body, headers]) => {
                if (body.rows.length == 0) {
                    throw new ExtendedError_1.default('Authentication failed. User not found.', 404);
                    //return this.sendErrorResponse(res, 404, 'Authentication failed. User not found.');
                }
                else {
                    var user = body.rows[0].value, encryptedPass = this.getEncryptedPassword(password);
                    // check if password matches
                    if (user.password != encryptedPass) {
                        throw new ExtendedError_1.default('Authentication failed. Wrong password.', 401);
                        //return this.sendErrorResponse(res, 401, 'Authentication failed. Wrong password.');
                    }
                    else {
                        // if user is found and password is right, create a token
                        //expiresInMinutes: 1440 // expires in 24 hours
                        //expiresIn: config.tokenExpiresIn
                        return jsonwebtoken_1.sign(user, process.env.jsonwebtoken_super_secret, { expiresIn: 1440 });
                    }
                }
            })
                .catch((err) => {
                if (err instanceof ExtendedError_1.default) {
                    throw err;
                }
                else {
                    throw new ExtendedError_1.default(err, 400);
                }
            });
            return token;
        };
    }
}
exports.AuthenticationController = AuthenticationController;
const authenticationController = new AuthenticationController();
exports.default = authenticationController;
