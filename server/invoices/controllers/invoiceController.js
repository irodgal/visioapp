'use strict';

var PDFDocument = require('pdfkit');

module.exports.getPdf = function(req, res) {
	// create a document the same way as above
	var doc = new PDFDocument();

	//doc.pipe(fs.createWriteStream('out.pdf'));
	res.setHeader('Content-disposition', 'inline; filename="prueba.pdf"');
	res.setHeader('Content-type', 'application/pdf');
	// Respuesta HTTP
	doc.pipe(res);

	doc.info.Title = "Factura de prueba";

	//FIXME: aqui seria ir a buscar los datos, y en su callback montar el pdf

	var factura = {};
	factura.concepto = 'Concepto factura';
	factura.lineas = [];
	factura.lineas[0] = {'concepto': 'concepto 1', 'importe': 1};
	factura.lineas[1] = {'concepto': 'concepto 2', 'importe': 2};
	factura.importe = 3;

	doc.fontSize(20).text(factura.concepto, 100, 20);

	var h1 = 150;
	var h2 = 300;
	var v = 60;
	for (var i = 0; i < factura.lineas.length; i++) {
		doc.fontSize(12).text(factura.lineas[i].concepto, h1, v);
		doc.fontSize(12).text(factura.lineas[i].importe, h2, v);
		v = v + 40;
	};


	doc.fontSize(20).text(factura.importe, h2, v);

	doc.end();
};