(function () {

    angular.module('visioServicios').service('LoginService', loginService);

    function loginService($http) {

        //this.login =  $resource("/api/authentication");
        this.doingLogin = function (user) {
            return $http.post('/api/authentication', user);
        }

    }

} ());