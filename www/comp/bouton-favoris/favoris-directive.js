angular.module('btFavoris',[])
.directive('btFavoris', function($ionicModal, panier) {
  return {
    restrict : 'E',
    replace: true,
    templateUrl: 'comp/bouton-favoris/favoris-template.html',
    link: function(scope, element, attrs) {


      scope.favoris = false;
      scope.$on('favorisStatut', function(event, args) {

        console.log("Statut " + args);

        

      });

      scope.siConn = true;
      scope.$on('favorisLoading', function(event, args) {

        console.log("loading " + args);
        scope.loading = args;
        

      });

      


/*
      $ionicModal.fromTemplateUrl('templates/panier.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.modal = modal;
        });
/*
        element.bind('click', 
          function(){
            scope.modal.show();
          }
        );
*/      
    }
  };
});