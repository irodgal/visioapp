'use strict';

var crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	express = require('../../config/express.js'),
	config = require('../../config/config.js');

module.exports.getToken = function(req, res) {
	//chekear datos de entrada obligatorios
	if (!req.body.name) {
		return res.status(400).send({
			//message: errorHandler.getErrorMessage(err)
			message: 'Debe introducir name'
		});
	}

	if (!req.body.password) {
		return res.status(400).send({
			//message: errorHandler.getErrorMessage(err)
			message: 'Debe introducir password'
		});
	}

	//buscar el usuario por nombre
	config.database.view('users', 'nombreView', {
		keys: [req.body.name]
	}, function(err, body) {
		if (!err) {
			if (body.rows.length == 0) {
				res.status(404).send({
					message: 'Authentication failed. User not found.'
				});
			} else {
				var user = body.rows[0].value;
				
				var sha256 = crypto.createHash('sha256');
				var pass = sha256.update(req.body.password).digest('base64');

				// check if password matches
				if (user.password != pass) {
					res.status(401).send({
						message: 'Authentication failed. Wrong password.'
					});
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
			res.status(400).send({
				//message: errorHandler.getErrorMessage(err)
				message: err
			});
		}
	});
};

module.exports.getSecurity = function(req, res) {
	config.database.get_security(function(er, result) {
		if (er) {
			throw er;
		}

		console.log('Got security for prueba');
		console.log(result);

		res.send(result);
	});

};