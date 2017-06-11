"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class UserController {
    pruebaAccesoBD() {
        console.log('en pruebaAccesoBD');
        //console.log(config.client);
        //const client = new Client<Foo>("http://localhost:5984", "visio");
        /*
        const pp = config.client.get("15d3b91506830f2ebe36d35d79004252").then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log("ERRRORAZO");
            console.log(error);
        });
        console.log("LALAAL");
        console.log(pp);
        */
        //buscar el usuario por nombre
        config_1.default.clientDB.view('users', 'nombreView', { keys: ["Tomás"] })
            .then(function ([body, headers]) {
            console.log('OK');
            console.log(body);
        })
            .catch(function (err) {
            console.log('KO');
            console.error(err);
        });
        /*
    config.client.view('users', 'nombreView', {
        keys: ["Tomás"]
    }, function (err, body) {
        console.log('LLL');
        console.log(err);
        console.log(body);
        var user = body.rows[0].value;
        console.log(user);
        
        if (!err) {
            if (body.rows.length == 0) {
                return me.sendErrorResponse(res, 404, 'Authentication failed. User not found.');
            } else {
                var user = body.rows[0].value,
                    encryptedPass = me.getEncryptedPassword(req.body.password);
    
                // check if password matches
                if (user.password != encryptedPass) {
                    return me.sendErrorResponse(res, 401, 'Authentication failed. Wrong password.');
                } else {
                    // if user is found and password is right, create a token
                    var token = jwt.sign(user, express.getSuperSecret(), {
                        //expiresInMinutes: 1440 // expires in 24 hours
                        expiresIn: config.tokenExpiresIn
                    });
    
                    // return the information including token as JSON
                    res.send({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        } else {
            return me.sendErrorResponse(res, 400, err);
        }
        
    });
    */
        return "en pruebaAccesoBD";
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.default = userController;
