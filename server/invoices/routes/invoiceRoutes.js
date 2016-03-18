'use strict';

var invoiceController = require('../controllers/invoiceController.js');

module.exports = function(apiRoutes) {

	apiRoutes.route('/factura').get(invoiceController.getPdf);

}