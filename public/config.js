'use strict';

angular.module('visioApp').config(function ($stateProvider) {
    $stateProvider
        .state('not-found', {
            url: '*path',
            templateUrl: 'not-found.html'
        });
});

// Seguridad
angular.module('visioApp').run(function ($http) {
    $http.defaults.headers["appId"] = 'visioApp';
});

angular.module('visioApp').config(configuradorInterceptores);
angular.module('visioApp').config(configuradorLocalStorage);

function configuradorLocalStorage(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('visioApp').setNotify(true, true);
}

function configuradorInterceptores($httpProvider) {
    //funcion para controlar la seguridad; inyecta el token
    $httpProvider.interceptors.push(funcionInterceptoraSeguridad);
}

function funcionInterceptoraSeguridad($injector, $q, $rootScope, localStorageService) {
    var interceptor = {};

    // Función que se ejecutarán antes de cada petición
    interceptor.request = function (request) {
        if (isLoginRequest(request.url)) {
            localStorageService.clearAll();
        } else if (!localStorageService.get("token") || !localStorageService.get("user")) {
            localStorageService.clearAll();
            // le enviamos a login
            var $state = $injector.get('$state');
            $state.go('login');
        } else {
            console.log('setea el token');
            // Enviar en la cabecera el token previamente guardado en local storage
            request.headers["x-access-token"] = localStorageService.get("token");
            request.headers["user"] = localStorageService.get("user");
        }

        return request;
    };

    // Función que se ejecutarán despues de cada respuesta con error
    interceptor.responseError = function (response) {
        if (!isLoginRequest(response.url)) {
            var $state = $injector.get('$state');
            if (response.status === 401) {
                // Si no tenemos cookie o es inválida, recibiremos un 401
                $rootScope.mensaje = "No hay derecho!!!";
                // Redirigimos al usuario a la página de registro
                localStorageService.clearAll();
                $state.go('login');
            } else if (response.status === 419) {
                $rootScope.mensaje = "Estoy caduco!!!";
                // Similar al 401, pero con sesión caducada, implica borrar el código actual
                localStorageService.clearAll();
                $state.go('login');
            };
        }

        return $q.reject(response);
    }

    return interceptor;
}

function isLoginRequest(url) {
    if (url === '/api/authentication' || url === './estados/login/login.html') {
        return true;
    }
    return false;
}