'use strict'

var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	jwt = require('jsonwebtoken'),
	config = require('./config.js'),
	userController = require('../users/controllers/userController.js');

/**
 * Configure the modules server routes
 */
var initModulesServerRoutes = function(apiRoutes) {
	// Globbing routing files
	config.files.server.routes.forEach(function(routePath) {
		require(path.resolve(routePath))(apiRoutes);
	});
};

/**
 * Initialize application middleware
 */
var initMiddleware = function() {
	// Showing stack errors
	app.set('showStackError', true);

	// Enable jsonp
	app.enable('jsonp callback');

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Initialize favicon middleware
	//app.use(favicon(app.locals.favicon));

	// Enable logger (morgan)
	//app.use(morgan(logger.getFormat(), logger.getOptions()));

	// Environment dependent middleware
	/*
	if (process.env.NODE_ENV === 'development') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}
	*/
	// Add the cookie parser and flash middleware
	/*
	app.use(cookieParser());
	app.use(flash());
	*/


	// use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// basic route
	app.get('/', function(req, res) {
		res.send('Hello! The API is at /api');
	});

	// esta va fuera del control de token
	//app.route('/api/a').post(coreController.getToken);
	app.route('/api/a').post(userController.getToken);

	// get an instance of the router for api routes
	//esta ruta hara el control de token
	var apiRoutes = express.Router();

	// route middleware to verify a token
	apiRoutes.use(function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});

		} else {

			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});

		}
	});

	app.use('/api', apiRoutes);

	// Initialize modules server routes
	initModulesServerRoutes(apiRoutes);
};

var initJsonWebToken = function() {
	app.set('superSecret', config.secret);
}

module.exports.getSuperSecret = function() {
	return app.get('superSecret');
}

module.exports.init = function() {
	// Initialize Express middleware
	initMiddleware();

	// Initialize JsonWebToken superSecret
	initJsonWebToken();

	// Start the server
	var server = app.listen(config.port, function() {
		console.log('Magic happens at http://localhost:' + config.port);
	});

	// expose for testing
	config.server = server;
}