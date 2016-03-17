'use strict';

var expect = require("chai").expect,
	request = require("supertest"),
	path = require('path'),
	config = require(path.resolve('./server/config/config'));


describe("Test for Users", function() {
	//var server = request.agent("http://www.google.es");

	describe("Conexión al servidor", function() {

		it("rgdfgdfgdf", function(done) {

/*
			var user = {
				name: 'Tomás',
				password: 'visio'
			};


			request(config.server)
				.post("/api/a").send(user)
				//.expect("Content-type", /json/)
				.expect(200)
				.end(function(err, res) {
					expect(res.status).to.equal(200);
					done();
				});*/

			//console.log(server);
			done();
		});

	});

})