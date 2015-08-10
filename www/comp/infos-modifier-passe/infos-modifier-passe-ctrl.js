app.controller('InfosModifierPasseCtrl', ['$scope', 'UserService', 'dataService', '$ionicLoading', '$http', 'urlService', '$timeout', '$state', '$location', function ($scope, UserService, dataService, $ionicLoading, $http, urlService, $timeout, $state, $location) {
	
	$scope.passe = {};
	$scope.alert = {
		show:false,
		active:0,
		msg:[
			'Votre mot de passe actuel est incorrect !',
			'Vous devez entrer votre nouveau mot de passe 2 fois !'
		]
	}

	$scope.modifier = function(){
  		//$scope.passe.etab = dataService.getEtabId;
  		console.table( $scope.passe );
  		//console.log("passe " + $scope.infos.passe);
  		$scope.alert.show = false;
  		if ($scope.passe.nouv1!==$scope.passe.nouv2){
  			$scope.alert.show = true;
  			$scope.alert.active = 1;
  		} else {

	  		$ionicLoading.show({ template: 'Chargement...' });

	  		$http.post( urlService.api + 'app/utilisateur/modifier/passe/' + localStorage.auth_token, $scope.passe)
			.success(function(data, status, headers, config) {
				//$scope.message = data;
				if (data.msg==="ok"){
					$ionicLoading.show({ template: 'Vos modifications ont été sauvegardées !' });
					$timeout(function() {
	          			$ionicLoading.hide();
	          			$state.go('app.infos');
	        		}, 800);
				} else if (data.msg==="passe"){
					$ionicLoading.hide();
					$scope.alert.show = true;
  					$scope.alert.active = 0;
				}
				

			})

			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
				alert( "Impossible de se connecter ...");

			});
		}
  	};

  	$scope.goInfos = function(){
  		$location.path('app/infos');
  	};
  	

}])