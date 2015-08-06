app.directive('panierOuvrir', function($ionicModal) {
  return {
    restrict : 'E',
    replace: true,
    templateUrl: 'templates/panier-ouvrir.html',
    link: function(scope, element, attrs) {

      scope.test = "test";
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

app.directive('pwCheck', [function () {
                return {
                    require: 'ngModel',
                    link: function (scope, elem, attrs, ctrl) {

            var me = attrs.ngModel;
            var matchTo = attrs.pwCheck;

            scope.$watch('[me, matchTo]', function(value){
              ctrl.$setValidity('pwmatch', scope[me] === scope[matchTo] );
            });

                    }
                }
            }]);