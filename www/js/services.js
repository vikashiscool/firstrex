var app = angular.module('firstRex', [ionic]);

//Authentication service

app.service('LoginService', function ($q, $http) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var email = '';
  var password = '';
  var isAuthenticated = false;
  var authToken;

    // recognize user and automatically log him/her in
    //authenticate users and set headers
    function loadUserCredentials(){
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY)
      if(token) {
        useCredentials(token);
      }
    }


  function storeUserCredentials(token){
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    //used for "Keep me logged in" or "Remember me"
    useCredentials(token);
  };

  function useCredentials(token) {
    email = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
    //authorization

    // if (email == 'admin') {
    //   role = USER_ROLES.admin
    // }
    // if (email == 'user') {
    //   role = USER_ROLES.public
    // }
    $http.defaults.headers.common['X-Auth-Token'] = token;
  };

  function destroyUserCredentials(){
    authToken = undefined;
    email = '';
    isAuthenticated = false;
    //reset header
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    //remove item from localStorage (which destroys session)
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }


  var login = function(email, password) {
    return $q(function(resolve, reject){
      if((email == "admin@1rex.com" && password == "shareable")){
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
        } else{ 
        reject('Login failed');
        }
    });
  }

  var logout = function(){
    destroyUserCredentials();
  }

  //authorization
  // var isAuthorized = function(authorizedRoles) {
  //   if(!angular.isArray(authorizationRoles)) {
  //     authorizedRoles = [authorizedRoles];
  //   }   
  //   return (isAuthenticated && authorizationRoles.indexOf(role)!== -1);
  // }


  return {
    login: login,
    logout: logout,
    // isAuthorized: isAuthorized;
    isAuthenticated: function(){return isAuthenticated;},
    email: function(){return email}
    // role: function() {return role};  
    }
})    

//Auth interceptor -- intercepts HTTP calls
app.factory('AuthInterceptor', function ($rootscope, $q, AUTH_EVENTS){
  return {
    responseError: function(response){
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        // 403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
});

//inject Auth interceptor
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

      // loginUser: function(name, pw) {
      //     var deferred = $q.defer();
      //     var promise = deferred.promise;

      //     if (name == 'user' && pw == 'secret') {
      //         deferred.resolve('Welcome ' + name + '!');
      //     } else {
      //         deferred.reject('Try again.');
      //     }
      //     promise.success = function(fn) {
      //         promise.then(fn);
      //         return promise;
      //     }
      //     promise.error = function(fn) {
      //         promise.then(null, fn);
      //         return promise;
      //     }
      //     return promise;
      // }
  



