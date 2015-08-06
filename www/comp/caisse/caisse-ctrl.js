app.controller('CaisseCtrl', ['$scope', '$ionicLoading', 'panier', 'dataService', '$http', function ($scope, $ionicLoading, panier, dataService, $http) {
	
	$ionicLoading.show();

  getTotalPrix = function () {
    var i = 0,
        prixTotal = 0;

    for (i; i < commande.panier.length; i = i + 1) {
      if (commande.panier[i].total) {
        prixTotal = prixTotal + parseFloat(commande.panier[i].total);
      }
    }

    return prixTotal.toFixed(2);
  };


	var commande = {};
	commande.etab = dataService.getEtabId;
	commande.panier = panier.liste;
	commande.total = getTotalPrix();

	//console.log('total ' + JSON.stringify(commande) );

	//
	//	
	//

	// //console.log('panier : ' + JSON.stringify(panier.liste) );
	$http.post( dataService.urlApi + 'app/commande/statut/0', commande ).
  	then(function(response) {
  		//console.log('response ' + response);
  		if (response.msg==="ok"){
  			commande.id = response.id
  		}
  	}, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  	});


}]);