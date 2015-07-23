app.controller('PanierCtrl', ['$scope','panier', function($scope, panier){
	
	$scope.articles = panier.liste;
  $scope.prixTotal = 0;
	$scope.test = "ok";

	console.log ("ok");

  $scope.getTotalPrix = function () {
    var i = 0,
        prixTotal = 0;
    
    for (i; i < $scope.articles.length; i = i + 1) {
      if ($scope.articles[i].total) {
        prixTotal = prixTotal + parseFloat($scope.articles[i].total);
      }
    }
    
    return prixTotal.toFixed(2);
  };
  
}]);