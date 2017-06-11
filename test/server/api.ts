import * as mocha from "mocha";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "../../server/app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Server General Tests", () => {

    it("Connect to server - get('/')", () => {
        //activar cuando se meta la pare de angular
        /*
        return chai.request(app)
            .get('/')
            .then(res => {
                expect(res.status).to.be.equal(200);
                //var prueba = {prueba: "preuba"};
                //difernecias entre eql y equal
                //expect(res.body.prueba).to.be.equal(prueba.prueba);
                //expect(res.body).not.to.equal(prueba);
            })
        */
    });

    describe("Wrong requests", () => {

        it("post('/XXX')", () => {
            return chai.request(app)
                .post('/XXX')
                .catch(res => {
                    expect(res.status).to.be.equal(404);
                    expect(res.response.error.text).to.contains("Cannot POST /XXX");
                });
        });

        it("put('/XXX')", () => {
            return chai.request(app)
                .put('/XXX')
                .catch(res => {
                    expect(res.status).to.be.equal(404);
                    expect(res.response.error.text).to.contains("Cannot PUT /XXX");
                });
        });

        it("delete('/XXX')", () => {
            return chai.request(app)
                .del('/XXX')
                .catch(res => {
                    expect(res.status).to.be.equal(404);
                    expect(res.response.error.text).to.contains("Cannot DELETE /XXX");
                });
        });
    });

    describe("Forbbidden requests to api; without token", () => {

		it("get('/api/XXX')", () => {
			return chai.request(app)
				.get('/api/XXX')
				.catch((res) => {
					expect(res.status).to.equal(401);
					expect(res.response.error.text).to.be.equal('{"success":false,"message":"No token provided."}');
				});
		});

		it("post('/api/XXX')", () => {
			return chai.request(app)
				.post('/api/XXX')
				.catch((res) => {
					expect(res.status).to.equal(401);
					expect(res.response.error.text).to.be.equal('{"success":false,"message":"No token provided."}');
				});
		});

		it("put('/api/XXX')", () => {
			return chai.request(app)
				.put('/api/XXX')
				.catch((res) => {
					expect(res.status).to.equal(401);
					expect(res.response.error.text).to.be.equal('{"success":false,"message":"No token provided."}');
				});
		});

		it("delete('/api/XXX')", () => {
			return chai.request(app)
				.del('/api/XXX')
				.catch((res) => {
					expect(res.status).to.equal(401);
					expect(res.response.error.text).to.be.equal('{"success":false,"message":"No token provided."}');
				});
		});
	});
})