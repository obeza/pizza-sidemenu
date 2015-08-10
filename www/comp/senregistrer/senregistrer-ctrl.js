app.controller('SenregistrerCtrl', ['$scope', '$ionicSlideBoxDelegate', '$http', 'dataService', '$state', 'urlService', function ($scope, $ionicSlideBoxDelegate, $http, dataService, $state, urlService) {
	
	$scope.test = "ok";
	$scope.user = {};
	$scope.erreurEmail = false;
	
	$scope.disableSwipe = function() {
		$ionicSlideBoxDelegate.enableSlide(false);
		
	};

	$scope.nextSlide = function() {
    	$ionicSlideBoxDelegate.next();
  	};

  	$scope.senregistrer = function(user){
  		user.etab = dataService.getEtabId;
  		console.log( JSON.stringify(user));

  		var res = $http.post( urlService.api + 'app/utilisateur/creer', user);
		res.success(function(data, status, headers, config) {
			//$scope.message = data;
			var msg = data.msg;
			console.log("msg " + msg);
			if (msg==="ok"){
				$state.go("app.bienvenue");
			} else if (msg==="email"){
				$scope.erreurEmail = true;
			} else {
				alert( "Impossible de se connecter ...");
			}

		});
		res.error(function(data, status, headers, config) {
			alert( "Impossible de se connecter ...");
		});
  	};

	$scope.villes = dataService.villes;

}]);