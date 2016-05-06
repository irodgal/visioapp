angular.module('visioServicios').service('invoicesService', invoicesService);

    function invoicesService($http) {
       
        this.gettingInvoicePdf = function () {
            var requestConfig = {};
            requestConfig.responseType = 'arraybuffer';
            
            return $http.get('/api/factura', requestConfig);
        }
    }