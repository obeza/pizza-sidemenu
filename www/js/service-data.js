
angular.module('PizzaServices', [])
.factory('dataService', function ($http, $q ) {

	var dataSave =  JSON.parse(window.localStorage.getItem('dataSave'));

	//var urlApi = 'http://fdacentral.com/api/pizza-service/etab/';

	var urlJson = "data.json";
	var dateCache;
	
	function checkDateCache(){
		var date2 = new Date();
		if ( !dateCache ) { 
			dateCache = new Date();
			console.log("dtc null");
		}
		console.log("dc " + dateCache);
		var hours = Math.abs(dateCache - date2) / 36e5;
		if (hours>1) { dateCache = date2; };
		console.log("hours " + hours);
		return hours;
	}

	return {
		
		getEtabId: 2,
		get: function (){
			var defer = $q.defer();

			// test de cache sur 1h
			//
			var getDateCache = checkDateCache();
			if (!dataSave || getDateCache>1){

				$http.get( this.urlApi + 'etab/' + this.getEtabId )
					.then(function(response){
						//console.log("service liste : "+ JSON.stringify(response.data));
		   				console.log('data from api');
		   				this.getSave = response.data;
		   				window.localStorage.setItem('dataSave', JSON.stringify(this.getSave));
		   				//var reponse = { "reponse" : "ok" }
						
						defer.resolve( response.data );

					}, function(response) {
						// probleme de connexion !!!
						console.log("errrorrrr : ");
						//var reponse = { "reponse" : "erreur" }
						defer.reject( dataSave );

					});

			} else {
				//	
				//
				console.log('data from cache');
				defer.resolve( dataSave );
			}

			return defer.promise;

		},
		getSave:dataSave,
		villes : [ 
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
		
	]

	}

});
