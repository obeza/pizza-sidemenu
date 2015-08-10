app.controller('FavorisCtrl', ['$scope', '$ionicLoading', '$http', 'urlService', '$ionicModal', 'panier', '$ionicPopup', '$timeout', function ($scope, $ionicLoading, $http, urlService, $ionicModal, panier, $ionicPopup, $timeout) {
	
	$scope.test = "ok";
  $scope.choixTaille = false;
	$scope.articles = [];
	var auth_token = localStorage.auth_token;

	$ionicLoading.show();

	$http.get(urlService.api + 'app/favoris/liste/' + localStorage.auth_token).
	success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    
	    $scope.articles = data;
	    console.table($scope.articles);
	    $ionicLoading.hide();
	}).
	error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    //alert('data ' + data);
	    $ionicLoading.hide();
	    //alert('impossible de se connecter sur le serveur...');
	});

  $ionicModal.fromTemplateUrl('templates/modal-article-ajouter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

	$scope.indexDe = function(obj){
    	var idx = $scope.articles.indexOf(obj);
    	return idx;
	}

  $scope.voir = function(article) {
    $scope.article = $scope.articles[article];

    console.log("articleId " + $scope.article.id);

    //favorisGet($scope.article.id);
    $scope.favorisStatut = true;
    $scope.siConn = true;

    if($scope.article.prix>0){
      //console.log("simple");
      //$scope.modalSimple.show();
      $scope.choixTaille = true;
      $scope.article.PanierPrix = $scope.article.prix;
      $scope.active = 'prix';
    } else {
      //console.log("pizza " + article);
      $scope.article.PanierPrix = $scope.article.prix2;
      //console.log("prix 2 = " + $scope.article.PanierPrix );
      $scope.active = 'prix2';
    }

    $scope.modal.show();
    $scope.article.quantite = 0;
    $scope.article.total = 0;

  }


  function favorisGet(id){  
    //$rootScope.$broadcast('favorisLoading', true);
    $scope.favorisLoading = true;
    $scope.siConn = false;
    $scope.favorisStatut = false;
    console.log('ulr ' + urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement + "/token/" + auth_token);
    $http.get(urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement + "/token/" + auth_token).
    success(function(data, status, headers, config) {
      $scope.favorisLoading = false;
      console.log("jaime : " + data.jaime);
      $scope.favorisStatut = data.jaime=="y" ? true : false;
      $scope.siConn = true;
    }).
    error(function(data, status, headers, config) {
      // sans doute pas de connection Internet
      $scope.favorisLoading = false;
      $scope.siConn = false;
    });

  }

  $scope.favorisClick = function(id){
    $scope.favorisLoading = true;
    var jaime;
    if ($scope.favorisStatut) {
      jaime = 'n';
      $scope.favorisStatut = false;
    } else {
      jaime = 'y';
      $scope.favorisStatut = true;
    }
    console.log('click ' + jaime);
    
    var url = urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement + "/jaime/" + jaime + "/token/" + auth_token;
    console.log('url ' + url);
    $http.get( url ).
    success(function(data, status, headers, config) {
      $scope.favorisLoading = false;
      if (data.msg==="token"){
        $scope.siConn = false;
      }
      console.log("msg jaime retour : " + data.msg);
      
    }).
    error(function(data, status, headers, config) {
      // sans doute pas de connection Internet
      $scope.favorisLoading = false;
      $scope.siConn = false;
    });   
  };

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


