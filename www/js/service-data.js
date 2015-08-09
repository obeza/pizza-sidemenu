
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
		getSave:dataSave

	}

});
