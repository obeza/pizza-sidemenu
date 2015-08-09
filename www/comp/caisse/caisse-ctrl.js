app.controller('CaisseCtrl', ['$scope', '$ionicLoading', 'panier', 'dataService', '$http', 'PaypalService', 'urlService', function ($scope, $ionicLoading, panier, dataService, $http, PaypalService, urlService) {
	

	var userId;

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

	$http.get( urlService.api + 'app/utilisateur/infos' ).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    userId = data.id;
	    paypal();
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    alert('error ' + JSON.stringify(data));
	    $ionicLoading.hide();
	    //alert('impossible de se connecter sur le serveur...');
	  });

	function paypal(){

		PaypalService.initPaymentUI().then(function () {
                PaypalService.makePayment(commande.total, "Total").then(
                	function(data){
                		
                		alert('retour paypal ' + JSON.stringify(data.response));
                		//alert('retour paypal ' + data.response.state);

                		if ( data.response.state ==="approved"){
                			pending(data.response);
                		}
                		
                	})
 			});

	}  


	// //console.log('total ' + JSON.stringify(commande) );

	// //
	// //	
	// //

	// // //console.log('panier : ' + JSON.stringify(panier.liste) );
	function pending(data){
		commande.paypalres = data.id;
		commande.userid = userId;
		alert('pending ' + JSON.stringify(data));
		$http.post( urlService.api + 'app/commande/statut/0', commande ).
	  	then(function(response) {
	  		$ionicLoading.hide();
	  		
	  		var data = response.data;
	  		alert('retour central ' + JSON.stringify(data));
	  		//$scope.msg = data.msg;
	  		//alert('response ' + data );
	  		if (data.msg==="ok"){
	  			commande.id = data.id;
	  			$scope.id = commande.id;
	  			//paypalService.initPaymentUI();	 
	  		}

	  	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    	$ionicLoading.hide();
	    	alert('error ' + JSON.stringify(response));
	  	});		
	}




}]);


