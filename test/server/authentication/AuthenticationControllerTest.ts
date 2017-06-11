import * as mocha from "mocha";
import * as chai from "chai";

import authenticationController from '../../../server/authentication/AuthenticationController';

const expect = chai.expect;

describe("Authentication Controller Tests", () => {

    it("Usuario erroneo; no obtiene token", function () {
        var userData = {name: '', password: ''};
        authenticationController.getToken(userData.name, userData.password).catch(ee => {
            expect(ee).not.to.be.null;
            expect(ee.statusCode).to.be.equal(404);
        });
    });

    it("Usuario correcto; obtiene token", function () {
        var userData = {name: 'Prueba', password: '1234'};
        authenticationController.getToken(userData.name, userData.password).then(token => {
            expect(token).not.to.be.null;
        });
    });

});