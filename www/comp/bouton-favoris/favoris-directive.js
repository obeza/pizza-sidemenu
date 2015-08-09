angular.module('btFavoris',[])
.directive('btFavoris', function($ionicModal, panier) {
  return {
    restrict : 'E',
    replace: true,
    templateUrl: 'comp/bouton-favoris/favoris-template.html',
    link: function(scope, element, attrs) {


      scope.$on('articleId', function(event, args) {

        console.log("article id " + args);

        scope.siConn = false;
        if (localStorage.auth_token) {
          console.log("auth");
          scope.siConn = true;
        }

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