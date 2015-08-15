app.controller('FavorisCtrl', ['$scope', '$ionicLoading', '$http', 'urlService', '$ionicModal', 'panier', '$ionicPopup', '$timeout', 'imageService', 'UserService', function ($scope, $ionicLoading, $http, urlService, $ionicModal, panier, $ionicPopup, $timeout, imageService, UserService) {
	
	$scope.test = "ok";
  $scope.choixTaille = false;
	$scope.articles = [];
	var auth_token = localStorage.auth_token;
  UserService.loginUrl = "app.favoris";

	$ionicLoading.show();

	$http.get(urlService.api + 'app/favoris/liste').
	success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    
	    $scope.articles = data.data;
	    console.table(data.data);
	    $ionicLoading.hide();
	}).
	error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    //alert('data ' + data);
	    $ionicLoading.hide();
	    alert('connection impossible...');
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

    $scope.imageUrl = function(id){
    var url = imageService.url(id);
    //console.log('coucou');
    return url;
  };


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

  //
  // -- debut directive à faire --
  //
  
  function favorisGet(id){  
    //$rootScope.$broadcast('favorisLoading', true);
    $scope.favorisLoading = true;
    $scope.siConn = false;
    $scope.favorisStatut = false;
    console.log('ulr ' + urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement );
    $http.get(urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement ).
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

      //
      //  on supprime du tableau l'article qu'on n'aime plus
      //
        var result = null;
        for (var i = 0; i < $scope.articles.length; i++) { 
          if ($scope.articles[i].id === id) { 
            result = i;
            break;
          } 
        }
        console.log("remove ---" + result);
        $scope.articles.splice(result, 1);
      //
      //
      //

    } else {
      jaime = 'y';
      $scope.favorisStatut = true;
    }
    console.log('click ' + jaime);
    
    //var url = urlService.api + 'app/favoris/' + id + "/etab/" + $scope.article.etablissement + "/jaime/" + jaime ;
    //console.log('url ' + url);
    
    var data = {
      id:id,
      etab:$scope.article.etablissement,
      jaime:jaime
    };
    console.log('data ' + data);

    $http.post( urlService.api + 'app/favoris', data ).
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

  //
  // -- fin directive à faire >>>
  //

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


