import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import * as crypto from "crypto";

import config from "../config"
import ExtendedError from '../common/ExtendedError';

export class AuthenticationController {

    private getEncryptedPassword = (password: string): String => {
        var sha256 = crypto.createHash('sha256');
        return sha256.update(password).digest('base64');
    }

    public getToken = (name: string, password: string): Promise<String> => {
        var token = config.clientDB.view('users', 'nombreView', { keys: [name] })
            .then(([body, headers]) => {
                if (body.rows.length == 0) {
                    throw new ExtendedError('Authentication failed. User not found.', 404);
                    //return this.sendErrorResponse(res, 404, 'Authentication failed. User not found.');
                } else {
                    var user = body.rows[0].value,
                        encryptedPass = this.getEncryptedPassword(password);

                    // check if password matches
                    if (user.password != encryptedPass) {
                        throw new ExtendedError('Authentication failed. Wrong password.', 401);
                        //return this.sendErrorResponse(res, 401, 'Authentication failed. Wrong password.');
                    } else {
                        // if user is found and password is right, create a token
                        //expiresInMinutes: 1440 // expires in 24 hours
                        //expiresIn: config.tokenExpiresIn
                        return sign(user, process.env.jsonwebtoken_super_secret, { expiresIn: 1440 });
                    }
                }
            })
            .catch((err) => {
                if (err instanceof ExtendedError) {
                    throw err;
                } else {
                    throw new ExtendedError(err, 400);
                }
            });

        return token;
    }
}

const authenticationController = new AuthenticationController();
export default authenticationController;