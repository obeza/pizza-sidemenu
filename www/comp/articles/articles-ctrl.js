
app.controller('ArticlesCtrl', ['$scope', 'dataService', '$stateParams', '$ionicModal', 'panier', '$ionicPopup', '$timeout', function($scope, dataService, $stateParams, $ionicModal, panier, $ionicPopup, $timeout){

  $scope.choixTaille = false;

	// dataService.get().then( function(d){
	// 	//console.log( "reponse2 : " + JSON.stringify(d) );
	// 	$scope.articles = d['articles'];

	// });

  $scope.articles = dataService.getSave['articles'];

	$scope.catId = $stateParams.catId;

	$scope.indexDe = function(obj){
    	var idx = $scope.articles.indexOf(obj);
    	return idx;
	}

  //
  // template pour les articles pizza
  //
  $ionicModal.fromTemplateUrl('templates/modal-article-ajouter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.voir = function(article) {
    $scope.article = $scope.articles[article];


    if($scope.article.prix>0){
      console.log("simple");
      //$scope.modalSimple.show();
      $scope.choixTaille = true;
      $scope.article.PanierPrix = $scope.article.prix;
      $scope.active = 'prix';
    } else {
      console.log("pizza " + article);
      $scope.article.PanierPrix = $scope.article.prix2;
      console.log("prix 2 = " + $scope.article.PanierPrix );
      $scope.active = 'prix2';

    }
    $scope.modal.show();
    $scope.article.quantite = 0;
    $scope.article.total = 0;

  }

  $scope.fermerModalPizza = function(){
    $scope.modal.hide();
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

  //
  //  Ajouter au panier
  //

  $scope.PanierAjouter = function(){
    console.log("qt : " + $scope.article['quantite']);

    $scope.article.active = $scope.active;

    if ($scope.article['quantite']>0){
      panier.ajouter($scope.article);

      var alertPopup = $ionicPopup.alert({
          title: 'Panier',
          template: 'Cet article a été ajouté',
          buttons:[]
        });
        $timeout(function() {
          alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 800);
      $scope.modal.hide();
      console.log("pass");
    }

  };


}]);
