'use strict';

describe("Client - Test for Login", function () {

    beforeEach(angular.mock.module('visioServicios'));

    var loginService, $httpBackend;
    var user = {
        name: 'XXXX',
        password: 'XXXX'
    };

    beforeEach(function () {

        angular.mock.inject(['loginService', function (service) {
            loginService = service;
        }]);

    });

    beforeEach(angular.mock.inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    it("Login service tiene una funcion para hacer login", function (done) {
        expect(loginService).to.have.property('doingLogin');
        done();
    });

    it("La funcion que hace el login devuelve un objeto response", function (done) {
        $httpBackend.whenPOST("/api/authentication").respond({
            token: 'XXX'
        });

        loginService.doingLogin(user)
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.token).to.exist;
                done();
            })

        $httpBackend.flush();
    });

});
