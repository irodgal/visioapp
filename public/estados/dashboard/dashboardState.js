(function () {
    angular.module('dashboard', ['ui.router', , 'LocalStorageModule', 'visioServicios'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    template: '<visio-dashboard></visio-dashboard>'
                })
        })
        .component('visioDashboard', {
            templateUrl: './estados/dashboard/dashboard.html',
            controller: dashboardCtrl
        });

    function dashboardCtrl(loginService, localStorageService, $state) {
        var vm = this;
        vm.mostrarMenu = true;
        console.log('en el dsahboard');

    }

} ());