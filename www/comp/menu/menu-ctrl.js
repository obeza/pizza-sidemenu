
app.controller('MenuCtrl', ['$scope', 'dataService', '$ionicLoading', function($scope, dataService, $ionicLoading){

	$ionicLoading.show();

	var promise = dataService.get()
	.then(function(d) {
	  	dataLoaded(d);
	}, function(d) {
		dataLoaded(d);
	});

	function dataLoaded(d){
		$ionicLoading.hide();
		$scope.categories = d['categories'];
	}

	//PushProcessingService.registerID

}]);