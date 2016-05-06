'use strict';

//var angular = require('angular');
//require('angular-mocks');

describe("Client - Test for Login", function () {

    beforeEach(module('visioServicios'));

    var loginService;

    beforeEach(function () {
        inject(['loginService', function (service) {
            loginService = service;
        }
        ]);
    });

    it("Primer test", function (done) {
        console.log("PP");
        console.log(loginService);

        var user = {
            name: 'Prueba',
            password: '1234'
        };

        loginService.doingLogin(user)
            .then(function (result) {
                console.log("login hecho bien");
                done();
            })
            .catch(function (err) {
                console.log("login hecho mal");
                done();
            });
        
        done();
          
    });
});