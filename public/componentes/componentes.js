(function () {

    angular.module('visioComponentes', ['visioMenu'])
        .component('visioContenido', {
            template: '<div ui-view></div>'
        })

} ());