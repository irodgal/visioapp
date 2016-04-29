(function () {
    angular.module('visioMenu', ['ui.router'])
        .controller('MenuCtrl', menuCtrl)
        .component('visioMenu', {
            templateUrl: './componentes/menu/tpl-menu.html',
            controller: 'MenuCtrl'
        });

    function menuCtrl($state) {
        var vm = this;
        if ($state.is('login')) {
            vm.mostrarMenu = false;
        } else {
            vm.mostrarMenu = true;
        }

        this.soyElEstadoActivo = function (estado) {
            return $state.is(estado);
        }
    }
} ());