
app.controller('ArticlesCtrl', ['$scope', 'dataService', '$stateParams', '$ionicPopup', function($scope, dataService, $stateParams, $ionicPopup){

	dataService.get().then( function(d){
		//console.log( "reponse2 : " + JSON.stringify(d) );
		$scope.articles = d['articles'];

	});

	$scope.catId = $stateParams.catId;

	$scope.indexDe = function(obj){
    	var idx = $scope.articles.indexOf(obj);
    	return idx;
	}

	$scope.test = function(){
		console.log("ok")	;
	};

$scope.voir = function(article) {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<img src="img/happy300x300.jpg" width="100%" alt="" /><input type="password" ng-model="data.wifi"><div class="button-bar"><a class="button" ng-click="test()">First</a><a class="button">Second</a></div>',
    title: article.nom,
    subTitle: article.description,
    scope: $scope,
    buttons: [
      
      {
        text: 'Annuler',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      },
      { text: 'Ajouter' }
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

 };

}]);