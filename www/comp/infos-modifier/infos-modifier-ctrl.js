app.controller('InfosModifierCtrl', ['$scope', 'UserService', 'dataService', '$ionicLoading', '$http', 'urlService', '$timeout', '$state', function ($scope, UserService, dataService, $ionicLoading, $http, urlService, $timeout, $state) {
	
	$scope.infos = UserService.infos;
	$scope.loadingChange = false;

	$scope.villes = dataService.villes;

	$scope.modifier = function(){
  		$scope.infos.etab = dataService.getEtabId;
  		//console.table( $scope.infos);

  		$ionicLoading.show({ template: 'Chargement...' });


  		var res = $http.post( urlService.api + 'app/utilisateur/modifier' , $scope.infos);
		res.success(function(data, status, headers, config) {
			//$scope.message = data;
			$ionicLoading.show({ template: 'Vos modifications ont été sauvegardées !' });
			$timeout(function() {
          		$ionicLoading.hide();
          		$state.go('app.infos');
        	}, 800);

		});
		res.error(function(data, status, headers, config) {
			alert( "Impossible de se connecter ...");
		});
  	};


  	$scope.amodifier = function(data){
  		console.log('data ' + data);
  		$scope.loadingChange = true;
  	}

}])