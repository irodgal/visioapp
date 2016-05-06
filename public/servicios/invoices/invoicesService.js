angular.module('visioServicios').service('InvoicesService', invoicesService);

    function invoicesService($http) {
       
        this.gettingInvoicePdf = function () {
            var requestConfig = {};
            requestConfig.responseType = 'arraybuffer';
            
            return $http.get('/api/factura', requestConfig);
        }
    }