app.controller('InfosCtrl', ['$scope', '$http', '$ionicLoading', 'dataService', function ($scope, $http, $ionicLoading, dataService) {
	
	$scope.infos = {};
	console.log('infos ...');

	$ionicLoading.show({
      template: 'Chargement...'
    });

	$http.get(dataService.urlApi + 'app/utilisateur/infos').
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    console.log('data suce ' + JSON.stringify(data));
	    $scope.infos = data;
	    $ionicLoading.hide();
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log('data ' + data);
	    $ionicLoading.hide();
	    //alert('impossible de se connecter sur le serveur...');
	  });

}]);