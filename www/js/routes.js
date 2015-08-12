


app.config(function($stateProvider, $urlRouterProvider) {
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
  .state('app.senregistrer', {
    url: '/senregistrer',
    views: {
      'menuContent': {
        templateUrl: 'comp/senregistrer/senregistrer-template.html',
        controller: 'SenregistrerCtrl'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'comp/login/login-template.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.bienvenue', {
    url: '/bienvenue',
    views: {
      'menuContent': {
        templateUrl: 'comp/bienvenue/bienvenue-template.html'
      }
    }
  })
  .state('app.favoris', {
    url: '/favoris',
    views: {
      'menuContent': {
        templateUrl: 'comp/favoris/favoris-template.html',
        controller: 'FavorisCtrl'
      }
    }
  })
  .state('app.infos', {
    url: '/infos',
    views: {
      'menuContent': {
        templateUrl: 'comp/infos/infos-template.html',
        controller: 'InfosCtrl'
      }
    }
  })
  .state('app.infosmodifier', {
    url: '/infos/modifier',
    views: {
      'menuContent': {
        templateUrl: 'comp/infos-modifier/infos-modifier-tpl.html',
        controller: 'InfosModifierCtrl'
      }
    }
  })
  .state('app.infosmodifierpasse', {
    url: '/infos/modifier/passe',
    views: {
      'menuContent': {
        templateUrl: 'comp/infos-modifier-passe/infos-modifier-passe-tpl.html',
        controller: 'InfosModifierPasseCtrl'
      }
    }
  })
  .state('app.caisse', {
    url: '/caisse',
    views: {
      'menuContent': {
        templateUrl: 'comp/caisse/caisse-tpl.html',
        controller: 'CaisseCtrl'
      }
    }
  })
  .state('app.livraison', {
    url: '/livraison',
    views: {
      'menuContent': {
        templateUrl: 'comp/livraison/livraison-tpl.html',
        controller: 'LivraisonCtrl'
      }
    }
  })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menu');
})

;