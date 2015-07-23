app.factory('FavorisService', ['dataService', function (dataService) {
	
	var favorisSave =  JSON.parse(window.localStorage.getItem('favorisSave'));

	return {
		favoris: favorisSave,
		ajouter:function(data){
			favorisSave.push(data);
			this.sauvegarder();
		},
		supprimer:function(index){
			favorisSave.splice(0, index);
			this.sauvegarder();
		},
		sauvegarder:function(){
			window.localStorage.setItem('favorisSave',JSON.stringify(favorisSave));	   				
		},
		jaime: function(id){
			dataService.
		}
	};

}])