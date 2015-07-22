
app.controller('MenuCtrl', ['$scope', 'dataService', function($scope, dataService){

	dataService.get().then( function(d){
		//console.log( "reponse2 : " + JSON.stringify(d) );
		$scope.categories = d['categories'];
	});

}]);