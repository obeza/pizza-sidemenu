// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'PizzaServices'])

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

})

.config(['$ionicConfigProvider',function($ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('Retour');
  //$ionicConfigProvider.views.maxCache(0);

}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.menu', {
    url: '/menu',
    views: {
      'menuContent': {
        templateUrl: 'comp/menu/menu-template.html',
        controller: 'MenuCtrl'
      }
    }
  })
  .state('app.menu-articles', {
    url: '/menu/articles/:catId',
    views: {
      'menuContent': {
        templateUrl: 'comp/articles/articles-template.html',
        controller: 'ArticlesCtrl'
      }
    }
  })
  .state('app.panier', {
    url: '/panier',
    views: {
      'menuContent': {
        templateUrl: 'comp/panier/panier-template.html',
        controller: 'PanierCtrl'
      }
    }
  })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menu');
})

;