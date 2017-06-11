import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as express from "express";

import app from "../../../server/app";
import AuthenticationRouter from '../../../server/authentication/AuthenticationRouter';

chai.use(chaiHttp);

const expect = chai.expect;

describe("Authentication Tests", () => {

    it("No envía nombre", function () {
        var user = {};

        chai.request(app)
            .post('/api/authentication')
            .send(user)
            .catch(res => {
                expect(res.status).to.equal(400);
                expect(res.response.error.text).to.be.equal('{"message":"Debe introducir name"}');
            });
    });

    it("No envía password", function () {
        var user = {
            name: 'XXX'
        };

        chai.request(app)
            .post('/api/authentication')
            .send(user)
            .catch(res => {
                expect(res.status).to.equal(400);
                expect(res.response.error.text).to.be.equal('{"message":"Debe introducir password"}');
            });
    });

    // con done por debajo porque la peticion viene de una promesa
    it("Usuario no encontrado", function (done) {
        var user = {
            name: 'XXX',
            password: 'XXX'
        };

        chai.request(app)
            .post('/api/authentication')
            .send(user)
            .catch(res => {
                expect(res.status).to.equal(404);
                expect(res.response.error.text).to.be.equal('{"message":"Authentication failed. User not found."}');

                done();
            });
    });

    it("Password errónea", function (done) {
        var user = {
            name: 'Prueba',
            password: 'XXX'
        };

        chai.request(app)
            .post('/api/authentication')
            .send(user)
            .catch(res => {
                expect(res.status).to.equal(401);
                expect(res.response.error.text).to.be.equal('{"message":"Authentication failed. Wrong password."}');

                done();
            });
    });

    it("Usuario Correcto", function (done) {
        var user = {
            name: 'Prueba',
            password: '1234'
        };

        chai.request(app)
            .post('/api/authentication')
            .send(user)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.message).to.be.equal('Enjoy your token!');
                expect(res.body.success).not.to.be.null;

                done();
            });
    });

})