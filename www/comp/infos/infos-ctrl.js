app.controller('InfosCtrl', ['$scope', '$http', '$ionicLoading', 'dataService', 'UserService', 'PushProcessingService', 'urlService','UserService','$state', function ($scope, $http, $ionicLoading, dataService, UserService, PushProcessingService, urlService, UserService, $state) {
	
	$scope.infos = {};
	console.log('infos ...');

	$ionicLoading.show({
      template: 'Chargement...'
    });

    $scope.villes = dataService.villes;

    //	on désigne la page où l'utilisateur sera redirigé s'il n'est pas logué
    UserService.loginUrl = "app.infos";

	$http.get(urlService.api + 'app/utilisateur/infos/' + localStorage.auth_token).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    console.log('data suce ' + JSON.stringify(data));
	    $scope.infos = data;
	    UserService.infos = data;
	    $ionicLoading.hide();
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    //alert('data ' + data);
	    $ionicLoading.hide();
	    //alert('impossible de se connecter sur le serveur...');
	  });

	//$scope.gcmid = PushProcessingService.getAndId();


	//
	//	Se déconnecter
	//
	$scope.deconnecter = function(){
		localStorage.auth_token = null;
		UserService.infos = {};
		$state.go('app.login');
	};

}]);