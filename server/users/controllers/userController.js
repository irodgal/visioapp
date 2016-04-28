'use strict';

var crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	express = require('../../config/express.js'),
	config = require('../../config/config.js');

var me = this;

this.getEncryptedPassword = function (password) {
	var sha256 = crypto.createHash('sha256');
	return sha256.update(password).digest('base64');
};

this.sendErrorResponse = function (res, statusCode, message) {
	return res.status(statusCode).send({
		//message: errorHandler.getErrorMessage(err)
		message: message
	});
}

module.exports.getToken = function (req, res) {

	//checkear datos de entrada obligatorios
	if (!req.body.name) {
		return me.sendErrorResponse(res, 400, 'Debe introducir name');
	}

	if (!req.body.password) {
		return me.sendErrorResponse(res, 400, 'Debe introducir password');
	}

	//buscar el usuario por nombre
	config.database.view('users', 'nombreView', {
		keys: [req.body.name]
	}, function (err, body) {
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
};

module.exports.getUserByName = function (req, res) {
	//checkear datos de entrada obligatorios
	if (!req.body.name) {
		return me.sendErrorResponse(res, 400, 'Debe introducir name');
	}

	config.database.view('users', 'nombreView', {
		keys: [req.body.name]
	}, function (err, body) {
		if (!err) {
			if (body.rows.length == 0) {
				return me.sendErrorResponse(res, 404, 'No existe usuario con nombre: ' + req.body.name);
			} else {
				res.send({
					success: true,
					message: 'Usuario encontrado',
					user: body.rows[0].value
				});
			}
		} else {
			return me.sendErrorResponse(res, 400, err);
		}
	});
};

module.exports.getSecurity = function (req, res) {
	config.database.get_security(function (er, result) {
		if (er) {
			throw er;
		}

		console.log('Got security for prueba');
		console.log(result);

		res.send(result);
	});

};

module.exports.insertUser = function (req, res) {
	//FIXME: aqui se podrian meter validaciones de campos y demás
	//res.status(400).send(err);
	//console.log(req);
	//TODO: no poder insertar 2 usuarios con el mismo nombre
	
	var user = req.body;

	//hash de la password
	user.password = crypto.createHash('sha256').update(user.password).digest('base64');

	config.database.insert(user, function (err, body) {
		if (!err) {
			res.status(200).send(body);
		} else {
			res.status(400).send({
				//message: errorHandler.getErrorMessage(err)
				message: err
			});
		}

	});
};

module.exports.removeUser = function (user) {
	myDatabase.destroy(user._id, user._rev, function (err, body) {
		if (!err)
			console.log(body);
	});
};