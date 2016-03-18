'use strict';

angular.module('visioApp').controller('pruebaCtrl', ['$http', function($http) {
	var scope = this;
	scope.name = null;
	scope.password = null;

	scope.prueba = function() {
		console.log('Nombre: ' + scope.name);
		console.log('Pass: ' + scope.password);

		/*
		var user = {};
	user.name = 'Tomás';
	user.password = 'visioXX';
	console.log(user);
	*/
		var user = {
			'name': scope.name,
			'password': scope.password
		};
		console.log(user);

		$http.post('/api/authentication', user).success(function(response) {
			console.log('bien');
			console.log(response);
			scope.message = 'Usuario correcto';
		}).error(function(response) {
			console.log('mal');
			console.log(response);
			scope.message = response.message;
		});
	}



}]);