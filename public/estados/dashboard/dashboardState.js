'use strict';

(function () {
    angular.module('dashboard', ['ui.router', 'ui.bootstrap', 'visioServicios'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    template: '<visio-dashboard></visio-dashboard>'
                })
        })
        .controller('DashboardCtrl', dashboardCtrl)
        .component('visioDashboard', {
            templateUrl: './estados/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });

    function dashboardCtrl($http, $uibModal, invoicesService, $scope, $sce) {
        var vm = this;

        vm.getPdf = function () {

            invoicesService.gettingInvoicePdf()
                .then(function (response) {
                    var file = new Blob([response.data], {
                        type: 'application/pdf'
                        //seguro que aqui le podemos dar nombre y demas
                    });

                    var fileURL = URL.createObjectURL(file);
                    $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);

                    var modalInstance = $uibModal.open({
                        //animation: $scope.animationsEnabled,
                        animation: true,
                        templateUrl: 'myModalContent.html',
                        controller: 'InvoicesModalCtrl',
                        //size: size,
                        //size: 200,
                        //openedClass: 'pepe1',
                        windowClass: 'invoices-modal',
                        //windowTopClass: 'pepe3',
                        resolve: {
                            pdfContent: function () {
                                return $scope.pdfContent;
                            }
                        }


                    });

                    modalInstance.result.then(function (selectedItem) {
                        //$scope.selected = selectedItem;
                        console.log("a1");
                        //esta parece que se lanza al pulsar dentro del modal (¿en un elemento?)
                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
                        console.log("a2");
                        //esta se lanza al pulsar fuera del modal
                    });

                })
                .catch(function (err) {
                    // vm.message = err.data.message;
                    console.log("Error en getPdf");
                });
        }
    }

    // Controlador para el modal
    angular.module('dashboard').controller('InvoicesModalCtrl', invoicesModalCtrl);
    function invoicesModalCtrl($scope, $uibModalInstance, pdfContent) {
        $scope.pdfContent = pdfContent;

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
    }

} ());