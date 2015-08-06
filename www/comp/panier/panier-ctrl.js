app.controller('PanierCtrl', ['$scope','panier', '$ionicModal', function($scope, panier, $ionicModal){

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

  $scope.indexDe = function(obj){
      var idx = $scope.articles.indexOf(obj);
      return idx;
  }

  //
  // template pour les articles pizza
  //
  $ionicModal.fromTemplateUrl('templates/modal-article-modifier.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.voir = function(articleId) {
    console.log("articleId " + articleId);
    $scope.articleId= articleId;
    $scope.article = $scope.articles[articleId];


    if($scope.article.prix>0){
      console.log("simple");
      //$scope.modalSimple.show();
      $scope.choixTaille = true;
      $scope.article.PanierPrix = $scope.article.prix;
    } else {
      // console.log("pizza " + article);
      $scope.article.PanierPrix = $scope.article.prix2;
      //console.log("prix 2 = " + $scope.article.PanierPrix );


    }
		$scope.active = $scope.article.active;
    $scope.modal.show();


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


  $scope.panierEffacer = function(){
    panier.supprimer($scope.articleId);
    $scope.modal.hide();
  };

  $scope.PanierModifier = function(){
		$scope.article.active = $scope.active;
    panier.modifier($scope.articleId, $scope.article);
    $scope.modal.hide();
  };

  /*
  **
      affichage des boutons : connecter, créer un compte ou payer
  **
  */

  $scope.conn = false;
  if (localStorage.auth_token){
    $scope.conn = true;

  }


}]);
