
app.controller('ArticlesCtrl', ['$scope', 'dataService', '$stateParams', '$ionicModal', function($scope, dataService, $stateParams, $ionicModal){

	dataService.get().then( function(d){
		//console.log( "reponse2 : " + JSON.stringify(d) );
		$scope.articles = d['articles'];

	});

	$scope.catId = $stateParams.catId;

	$scope.indexDe = function(obj){
    	var idx = $scope.articles.indexOf(obj);
    	return idx;
	}

  //
  // template pour les articles pizza
  //
  $ionicModal.fromTemplateUrl('templates/article-ajouter-pizza.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPizza = modal;
  });

  //
  // template pour les articles simples
  //
  $ionicModal.fromTemplateUrl('templates/article-ajouter-simple.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSimple = modal;
  });

  $scope.voir = function(article) {
    $scope.article = $scope.articles[article];


    if(article.prix>0){
      console.log("simple");
      $scope.modalSimple.show();
    } else {
      console.log("pizza " + article);
      $scope.article.PanierPrix = $scope.article.prix2;
      console.log("prix 2 = " + $scope.article.PanierPrix );
      $scope.active = 'prix2';
      $scope.modalPizza.show();
    }
    $scope.article.quantite = 0;
    $scope.article.total = 0;

  }

  $scope.fermerModalPizza = function(){
    $scope.modalPizza.hide();
  };

  $scope.setActive = function(type) {
      $scope.active = type;
      $scope.article.PanierPrix = $scope.article[type];
      total();
  };

  $scope.isActive = function(type) {
      //$scope.article.PanierPrix = $scope.article[type];
      return type === $scope.active;

  };

  $scope.plus = function(){
    $scope.article.quantite += 1; 
    total();
  };

  $scope.moins = function(){
    var q = $scope.article.quantite-1;
    if (q>=0){
      $scope.article.quantite = q;
      total();
    }
  };
  
  var total = function(){
    $scope.article.total = $scope.article.quantite*$scope.article.PanierPrix;
    $scope.article.total = $scope.article.total.toFixed(2);
  };


}]);

