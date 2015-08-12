/**
*  Module
*
* Description
*/
angular.module('UserService', []).
factory('UserService', ['$http', 'dataService', '$state', function ($http, dataService, $state) {

	return {
		infos:{},
		getInfos: function(){
			this.infos = JSON.parse( window.localStorage.getItem('userInfos') );
		},
		setInfos: function(infos){
			this.infos = infos;
			localStorage.userInfos = JSON.stringify(infos);
		},
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
		loginUrl:"",
		delogin: function(){
			localStorage.auth_token = null;
			this.infos = {};
			$state.go('app.login');
		}
	
	}

}]);