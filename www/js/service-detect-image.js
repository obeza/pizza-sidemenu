app.factory('imageService', ['$q', function ($q) {
	
	return {
		check : function(id){
			var deferred = $q.defer();
			var tester = new Image();
    		//tester.onload = this.imageFound;
    		
    		//tester.onerror = this.imageNotFound;
    		tester.onerror = function() {
                deferred.resolve(false);
            };
    		tester.onload = function() {
        		console.log("chargée");
    			deferred.resolve(true);
    		};
    		tester.src = this.url(id); 	

    		return deferred.promise;
		},
		url : function(id){
			var url = 'http://fdacentral.com/img/pizza/art'+id+'.jpg';
			return url;
		}
	};

}]);