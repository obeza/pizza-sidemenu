// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'PizzaServices', 'appConstant', 'ngCordova', 'angularLazyImg'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.quantite = 0;

$ionicPlatform.registerBackButtonAction(function (event) {
    if($ionicHistory.currentStateName() == "app.senregistrer"){
      event.preventDefault();
      // or do nothing
    } else if($ionicHistory.currentStateName() == "app.menu"){
      ionic.Platform.exitApp();
      // or do nothing
    }
    else {
      $ionicHistory.goBack();
    }
  }, 100);

})

.config(['$ionicConfigProvider',function($ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.views.maxCache(0);

}])

.directive('detectImg', function () {

    return function(scope, el, attr) {
                //scope.checkImage = true;
                //scope.checkImage[scope.detectImg] = true;
                
               
                el.bind('error', function() {                
                  
                  el.attr('src', 'img/imgprov.jpg');
                });
    //             el.bind('load', function() {
    //               console.log('detect...');
    //               //scope.checkImage[imgIndex] = false;
    //               scope.checkimage(attr.detectImg, true);
    //               el.removeClass("hidden");
    //             });
    }
    

});



