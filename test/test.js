'use strict';

var expect = require("chai").expect,
	request = require("supertest"),
	path = require('path'),
	config = require(path.resolve('./server/config/config'));

// set up
config.setUpForTest();

// tests for server
describe("Server General Tests", function() {

	it("Connect to server - get('/')", function(done) {
		request(config.server)
			.get('/')
			.expect(200)
			.end(function(err, res) {
				expect(res.status).to.equal(200);
				//expect(res.text).to.equal("Hello! The API is at /api");
				done();
			});
	});

	describe("Wrong requests", function() {
		/*
		it("get('/XXX')", function(done) {
			request(config.server)
				.get('/XXX')
				.expect(404)
				.end(function(err, res) {
					expect(res.status).to.equal(404);
					expect(res.text).to.equal("Cannot GET /XXX\n");
					done();
				});
		});
		*/

		it("post('/XXX')", function(done) {
			request(config.server)
				.post('/XXX')
				.expect(404)
				.end(function(err, res) {
					expect(res.status).to.equal(404);
					expect(res.text).to.equal("Cannot POST /XXX\n");
					done();
				});
		});

		it("put('/XXX')", function(done) {
			request(config.server)
				.put('/XXX')
				.expect(404)
				.end(function(err, res) {
					expect(res.status).to.equal(404);
					expect(res.text).to.equal("Cannot PUT /XXX\n");
					done();
				});
		});

		it("delete('/XXX')", function(done) {
			request(config.server)
				.delete('/XXX')
				.expect(404)
				.end(function(err, res) {
					expect(res.status).to.equal(404);
					expect(res.text).to.equal("Cannot DELETE /XXX\n");
					done();
				});
		});
	});

	describe("Forbbidden requests to api; without token", function() {

		it("get('/api/XXX')", function(done) {
			request(config.server)
				.get('/api/XXX')
				.expect(403)
				.end(function(err, res) {
					expect(res.status).to.equal(403);
					expect(res.text).to.equal('{"success":false,"message":"No token provided."}');
					done();
				});
		});

		it("post('/api/XXX')", function(done) {
			request(config.server)
				.post('/api/XXX')
				.expect(403)
				.end(function(err, res) {
					expect(res.status).to.equal(403);
					expect(res.text).to.equal('{"success":false,"message":"No token provided."}');
					done();
				});
		});

		it("put('/api/XXX')", function(done) {
			request(config.server)
				.put('/api/XXX')
				.expect(403)
				.end(function(err, res) {
					expect(res.status).to.equal(403);
					expect(res.text).to.equal('{"success":false,"message":"No token provided."}');
					done();
				});
		});

		it("delete('/api/XXX')", function(done) {
			request(config.server)
				.delete('/api/XXX')
				.expect(403)
				.end(function(err, res) {
					expect(res.status).to.equal(403);
					expect(res.text).to.equal('{"success":false,"message":"No token provided."}');
					done();
				});
		});

	});
});