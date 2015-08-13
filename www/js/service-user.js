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
			if (this.infos.id){
				console.log('arf');
			} else {
				var infos = JSON.parse( window.localStorage.getItem('userInfos') );
				if (infos){
					this.infos = infos;
					console.log('infos ' + this.infos);
					//return infos;
				} else {
					// problem !!!
				}
			}
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