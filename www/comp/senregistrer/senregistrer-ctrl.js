app.controller('SenregistrerCtrl', ['$scope', '$ionicSlideBoxDelegate', '$http', 'dataService', '$state', function ($scope, $ionicSlideBoxDelegate, $http, dataService, $state) {
	
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

  		var res = $http.post('http://localhost:8888/projet-pizza/pizza-service/app/utilisateur/creer', user);
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

	$scope.villes = [ 
		{ "nom":"Basse-Pointe"},
		{ "nom":"Bellefontaine"},
		{ "nom":"Case-Pilote"},
		{ "nom":"Ducos"},
		
		{ "nom":"Fonds-Saint-Denis"},
		{ "nom":"Fort-de-France" },
		{ "nom":"Grand'Rivière"},
		{ "nom":"Gros-Morne"},
		{ "nom":"L'Ajoupa-Bouillon"},
		{ "nom":"Le Carbet"},
		{ "nom":"Le Diamant"}, 
		{ "nom":"La Trinité"},
		{ "nom":"Le François"}, 
		{ "nom":"Le Lamentin" },
		{ "nom":"Le Lorrain"},
		{ "nom":"Le Marin"},
		{ "nom":"Le Marigot"},
		{ "nom":"Le Morne-Rouge"},
		{ "nom":"Le Morne-Vert"},
		{ "nom":"Le Prêcheur"},
		{ "nom":"Le Robert" },
		{ "nom":"Le Vauclin"},
		{ "nom":"Les Anses-d'Arlet"},
		{ "nom":"Les Trois-Îlets"},
		{ "nom":"Macouba"},
		{ "nom":"Rivière-Pilote" },
		{ "nom":"Rivière-Salée"}, 
		{ "nom":"Sainte-Anne"},
		{ "nom":"Saint-Esprit"},
		{ "nom":"Saint-Pierre"}, 
		{ "nom":"Saint-Joseph "},
		{ "nom":"Sainte-Luce"},
		{ "nom":"Sainte-Marie" }, 
		{ "nom":"Schoelcher " }
		
	];

}]);