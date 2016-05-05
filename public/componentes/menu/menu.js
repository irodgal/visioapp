(function () {
    angular.module('visioMenu', ['ui.router'])
        .controller('MenuCtrl', menuCtrl)
        .component('visioMenu', {
            templateUrl: './componentes/menu/tpl-menu.html',
            controller: 'MenuCtrl'
        });

    function menuCtrl($state, $scope) {

        this.soyElEstadoActivo = function (estado) {
            return $state.is(estado);
        }

        this.mostrarMenu = function () {
            if ($state.is('login')) {
                return false;
            } else {
                return true;
            }
        }
    }
} ());