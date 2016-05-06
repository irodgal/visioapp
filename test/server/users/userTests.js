'use strict';

var expect = require("chai").expect,
	request = require("supertest"),
	path = require('path'),
	express = require('express'),
	userController = require(path.resolve('./server/users/controllers/userController.js'));

describe("Test for Users", function () {

	describe("Gestión de usuarios", function () {

		it.skip("Inserción de un usuario", function (done) {

			var user = {
				name: 'Prueba',
				password: '1234'
			};

			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(200);
				expect(response.ok).to.be.true;
				expect(response.id).to.not.be.null;
				done();
			};

			userController.insertUser(req, res);
		});

		it.skip("Borrado de un usuario", function (done) {

			console.log(userController);
			userController.pepe();

			done();
		});
		
		it("Busqueda de un usuario - error de entrada", function (done) {

			var user = {};
			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(400);
				expect(response.message).to.equal('Debe introducir name');
				done();
			};

			userController.getUserByName(req, res);
			
		});
		
		it("Busqueda de un usuario - usuario no encontrado", function (done) {

			var user = {
				name: 'XXX'
			};
			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(404);
				expect(response.message).to.equal('No existe usuario con nombre: ' + user.name);
				done();
			};

			userController.getUserByName(req, res);
			
		});
		
		it("Busqueda de un usuario - usuario encontrado", function (done) {

			var user = {
				name: 'Prueba'
			};
			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				//expect(res.statusCode).to.equal(404);
				expect(response.success).to.be.true;
				expect(response.message).to.equal('Usuario encontrado');
				expect(response.user).not.to.be.null;
				expect(response.user.name).to.equal(user.name);
				done();
			};

			userController.getUserByName(req, res);
			
		});

	});

	describe("Token de seguridad", function () {

		it("No envía nombre", function (done) {
			var user = {};
			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				//expect(res.statusCode).to.equal(400);
				expect(response.message).to.equal('Debe introducir name');
				done();
			};
			

			userController.getToken(req, res);

		});

		it("No envía password", function (done) {
			var user = {
				name: 'XXX'
			};

			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(400);
				expect(response.message).to.equal('Debe introducir password');
				done();
			};

			userController.getToken(req, res);

		});

		it("Usuario no encontrado", function (done) {
			var user = {
				name: 'XXX',
				password: 'XXX'
			};

			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(404);
				expect(response.message).to.equal('Authentication failed. User not found.');
				done();
			};

			userController.getToken(req, res);

		});

		it("Password errónea", function (done) {
			var user = {
				name: 'Prueba',
				password: 'XXX'
			};

			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				expect(res.statusCode).to.equal(401);
				expect(response.message).to.equal('Authentication failed. Wrong password.');
				done();
			};

			userController.getToken(req, res);

		});

		it("Usuario Correcto", function (done) {
			var user = {
				name: 'Prueba',
				password: '1234'
			};

			var req = express.request;
			req.body = user;
			var res = express.response;
			res.send = function (response) {
				//Esta será la funcion de callback
				//expect(res.statusCode).to.equal(200);
				expect(response.success).to.be.true;
				expect(response.message).to.equal('Enjoy your token!');
				done();
			};

			userController.getToken(req, res);

		});

	});
});