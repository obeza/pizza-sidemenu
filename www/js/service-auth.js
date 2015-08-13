app.factory('authInterceptor', ['$q', '$location', function($q, $location){
  return {
    request: function(config){
      headers = config.headers || {};
      if (localStorage.auth_token) {
        config.headers.auth_token = localStorage.auth_token;
      }
      return config;
    },
    responseError: function(response){
      if (response.status === 401){
        console.log('status 401');
        //$state.go('app.login');
        localStorage.auth_token = null
        $location.path('app/login');
      }
      return $q.reject(response);
    }
  }
}])
.config(function( $httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
});