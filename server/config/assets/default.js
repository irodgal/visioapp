'use strict';

module.exports = {
	client: {
		lib: {
			js: [
				'node_modules/angular/angular.min.js'
			]
		}
	},
	server: {
		//routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		//routes: 'routes/**/*.js'
		routes: 'server/**/routes/**/*.js'
	}
};