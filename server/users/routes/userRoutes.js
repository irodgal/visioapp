'use strict';

var userController = require('../controllers/userController.js');

module.exports = function(apiRoutes) {

	apiRoutes.route('/a').get(userController.getSecurity);

}