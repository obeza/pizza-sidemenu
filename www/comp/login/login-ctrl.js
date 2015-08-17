app.controller('LoginCtrl', ['$scope','$http', 'dataService', '$state', 'UserService', '$ionicLoading', 'urlService', function ($scope, $http, dataService, $state, UserService, $ionicLoading, urlService) {
	
	$scope.login = {};
	$scope.login.etab = dataService.getEtabId;
	$ionicLoading.hide();
	
	$scope.connecter = function(login){
		console.log('login ' + JSON.stringify(login));

		$ionicLoading.show({
      		template: 'Chargement...'
    	});

		var url = urlService.api + 'app/utilisateur/login';
		console.log("url " + url);

		$http.post( url, login ).
		success(function(data, status, headers, config) {
		    $ionicLoading.hide();
		    if (data.msg==="ok"){
		    	console.log("infos " + JSON.stringify(data.infos));
		    	localStorage.auth_token = data.token;		    	
		    	UserService.setInfos(data.infos);
		    	var lienRedirect = UserService.loginUrl;
		    	if (!lienRedirect){
		    		lienRedirect = 'app.infos';
		    	}
		    	$state.go( lienRedirect );
		    	//$state.transitionTo('app.infos');

		    } else {
		    	alert('email ou mot de passe incorrect.');
		    }

		}).
		error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    alert('impossible de se connecter...');
		    $ionicLoading.hide();
		});
	};

}]);