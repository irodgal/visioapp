(function () {
    angular.module('login', ['ui.router', 'LocalStorageModule', 'visioServicios'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '',
                    template: '<visio-login></visio-login>'
                });
        })
        .component('visioLogin', {
            templateUrl: './estados/login/login.html',
            controller: loginCtrl
        });

    function loginCtrl(loginService, localStorageService, $state) {
        var vm = this;
        vm.usuario = {};
        vm.mostrarMenu = false;

        checkLocalStorage(localStorageService);

        vm.entrar = function () {

            loginService.doingLogin(vm.usuario)
                .then(function (result) {
                    vm.message = 'Usuario logueado: ' + vm.usuario.name;
                    //vm.token = result.data.token;
                    localStorageService.set("token", result.data.token);
                    localStorageService.set("user", vm.usuario.name);
                    $state.go('dashboard');
                })
                .catch(function (err) {
                    vm.message = err.data.message;
                });

        }
    }

    function checkLocalStorage(localStorageService) {
        if (!localStorageService.isSupported) {
            console.error('El navegador no soporta local storage');
        }
    }
} ());