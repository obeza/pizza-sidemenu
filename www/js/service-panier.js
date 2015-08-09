app.service('panier', function($rootScope){

	$rootScope.quantite = 0;
	
	this.liste = [];
	
	this.ajouter = function(article){
		this.liste.push(article);
		$rootScope.quantite = this.liste.length;
		//console.log("mon panier : " + JSON.stringify(this.panier));
	};

	this.get = function(id){
		return this.liste[id];
	};

	this.modifier = function(id, data){
		this.liste[id] = data;
	};

	this.supprimer = function(id){
		this.liste.splice(id, 1);
	};

	this.articleId;

});