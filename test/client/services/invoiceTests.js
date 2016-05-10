'use strict';

describe("Client - Test for Invoices", function () {

    beforeEach(angular.mock.module('visioServicios'));

    var invoicesService, $httpBackend;

    beforeEach(function () {

        angular.mock.inject(['invoicesService', function (service) {
            invoicesService = service;
        }]);

    });

    beforeEach(angular.mock.inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    it("Invoice service tiene una funcion para obtener el pdf", function (done) {
        expect(invoicesService).to.have.property('gettingInvoicePdf');
        done();
    });

    it("La funcion que obtiene el pdf devuelve un objeto response", function (done) {
        $httpBackend.whenGET("/api/factura").respond({
            any: 'XXX'
        });

        invoicesService.gettingInvoicePdf()
            .then(function (result) {
                expect(result.data).to.exist;
                done();
            })

        $httpBackend.flush();
    });

});