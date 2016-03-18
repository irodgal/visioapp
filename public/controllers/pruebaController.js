'use strict';

angular.module('visioApp').controller('pruebaCtrl', ['$http', '$sce', function($http, $sce) {
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
			scope.token = response.token;

		}).error(function(response) {
			console.log('mal');
			console.log(response);
			scope.message = response.message;
		});
	};

	scope.getPdf = function() {
		console.log('getpdf');



		if (!scope.token) {
			scope.message = 'Primero introduce un usuario correcto';
		} else {
			var requestConfig = {};
			requestConfig.headers = {
				"x-access-token": scope.token
			};
			requestConfig.responseType = 'arraybuffer';

			$http.get('/api/factura', requestConfig).success(function(response) {
				//console.log(response);

				
				var file = new Blob([response], {
					type: 'application/pdf'
					//seguro que aqui le podemos dar nombre y demas
				});
				console.log(file);
				var fileURL = URL.createObjectURL(file);
				scope.content = $sce.trustAsResourceUrl(fileURL);
				
			});
		}
	};



}]);