app.factory('UserService', ['$http', 'dataService', function ($http, dataService) {

	return {
		infos:{},

		register:function(user){
			promise = $http.post( dataService.urlApi + 'app/utilisateur/creer' )
					.then(function(response){
						
		   				return response;
		   				
					}, function(response) {
						// probleme de connexion !!!
						console.log("errrorrrr : ");
						
						return response;

				});
			return promise;
		},
		loginUrl:""
	
	};

}]);