
angular.module('PizzaServices', [])
.factory('dataService', function ($http, $q ) {

	var dataSave =  JSON.parse(window.localStorage.getItem('dataSave'));

	//var urlApi = 'http://fdacentral.com/api/pizza-service/etab/';

	var urlJson = "data.json";
	return {
		urlApi: 'http://fdacentral.com/api/pizza-service/',
		getEtabId: 2,
		get: function (){
			var promise
			//if (!dataSave){
				//console.log('dataSave ');
				promise = $http.get( this.urlApi + 'etab/' + this.getEtabId )
					.then(function(response){
						//console.log("service liste : "+ JSON.stringify(response.data));
		   				console.log('data from api');
		   				this.getSave = response.data;
		   				window.localStorage.setItem('dataSave',JSON.stringify(this.getSave));
		   				//var reponse = { "reponse" : "ok" }
						return dataSave;

					}, function(response) {
						// probleme de connexion !!!
						console.log("errrorrrr : ");
						//var reponse = { "reponse" : "erreur" }

						return dataSave;

					});
				return promise;

		},
		getSave:dataSave

	}

});
