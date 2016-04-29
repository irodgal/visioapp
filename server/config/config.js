'use strict';

require('dotenv').load();
var Cloudant = require('cloudant'),
	_ = require('lodash'),
	glob = require('glob'),
	path = require('path'),
	express = require('./express.js');

var nano = require('nano')('http://localhost:5984');


/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function (globPattern) {
			output = _.union(output, getGlobbedPaths(globPattern, excludes));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob.sync(globPatterns);
			if (excludes) {
				files = files.map(function (file) {
					if (_.isArray(excludes)) {
						for (var i in excludes) {
							file = file.replace(excludes[i], '');
						}
					} else {
						file = file.replace(excludes, '');
					}
					return file;
				});
			}
			output = _.union(output, files);
		}
	}

	return output;
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFiles = function (config, assets) {
	// Appending files
	config.files = {
		server: {},
		client: {}
	};

	// Setting Globbed route files
	config.files.server.routes = getGlobbedPaths(assets.server.routes);

	// Setting Globbed js files
	//config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/']));
	//config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/');

	//console.log(config.files);
};

var initGlobalConfig = function (me) {
	// Get the default assets
	var defaultAssets = require(path.join(process.cwd(), 'server/config/assets/default'));

	// Get the current assets
	//var environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};
	var environmentAssets = {};

	// Merge assets
	var assets = _.merge(defaultAssets, environmentAssets);


	// Get the default config
	var defaultConfig = require(path.join(process.cwd(), 'server/config/env/default'));

	// Get the current config
	//var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};
	var environmentConfig = {};

	// Merge config files
	var config = _.merge(defaultConfig, environmentConfig);

	//console.log(config);

	//console.log(assets);

	// Initialize global globbed files
	initGlobalConfigFiles(config, assets);

	_.merge(me, config);
};


// Initialization: Connect with DB; if success, launch server
module.exports.setUp = function () {
	var _this = this;

	_this.secret = process.env.jsonwebtoken_super_secret;

	if (process.env.host_db == 'localhost') {
		console.log("BD en local");
		
		// bd  en local (CouchDb)
		_this.database = nano.db.use(process.env.cloudant_database);

		// Initialize configuration
		initGlobalConfig(_this);

		// Initialize express config
		express.init();
		
	} else if (process.env.host_db == 'cloudant') {
		//credenciales para cloudant
		var me = process.env.cloudant_username || "nodejs",
			password = process.env.cloudant_password,
			databaseName = process.env.cloudant_database;

		// Initialize the library with my account.
		var cloudant = Cloudant({
			account: me,
			password: password
		}, function (err, cloudant) {
			if (err) {
				console.error('Failed to initialize Cloudant: ' + err.message);
			} else {
				// en config.database estará disponible para todos
				_this.database = cloudant.db.use(databaseName);

				// Initialize configuration
				initGlobalConfig(_this);

				// Initialize express config
				express.init();
			}
		});

	}
};

// Initialize for test
module.exports.setUpForTest = function () {
	var _this = this;

	_this.secret = process.env.jsonwebtoken_super_secret;

	if (process.env.host_db_test == 'localhost') {
		console.log("BD en local");
		
		// bd de test en local (CouchDb)
		_this.database = nano.db.use(process.env.cloudant_database_test);
	} else if (process.env.host_db_test == 'cloudant_test') {
		//credenciales para cloudant; bd de test

		var me = process.env.cloudant_username || "nodejs",
			password = process.env.cloudant_password,
			databaseName = process.env.cloudant_database_test;


		var cloudant = Cloudant({ account: me, password: password });
		_this.database = cloudant.db.use(databaseName);

	}

	// Initialize configuration
	initGlobalConfig(_this);

	// Initialize express config
	express.init();
};