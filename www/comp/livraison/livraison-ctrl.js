app.controller('LivraisonCtrl', ['$scope', 'UserService', 'panier', '$state', function ($scope, UserService, panier, $state) {
	
	$scope.livraison = panier.livraison;



	//	on désigne la page où l'utilisateur sera redirigé s'il n'est pas logué
    UserService.loginUrl = "app.infos";

    

	if (UserService.infos){
		$scope.infos = UserService.infos;
		console.table($scope.infos);
	} else {
		UserService.delogin();
	}

	$scope.goCaisse = function(){
		panier.livraison = $scope.livraison;
		console.log('scope ' + $scope.livraison);
		$state.go('app.caisse');
	};


	$scope.choixLivraison = function(){
		$scope.livraison = !$scope.livraison;
		return $scope.livraison;
	};

}]);