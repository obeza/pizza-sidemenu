
app.controller('MenuCtrl', ['$scope', 'dataService', '$ionicLoading', function($scope, dataService, $ionicLoading){

	$ionicLoading.show();
	dataService.get().then( function(d){
		//console.log( "reponse2 : " + JSON.stringify(d) );
		$ionicLoading.hide();
		$scope.categories = d['categories'];
	});

}]);