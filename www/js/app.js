// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('firstrex', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport from snapping when text inputs are focused. 
      //Ionic handles this internally for a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider){
  // Ionic uses AngularUI Router, which uses the concept of states.
  // More info can be found here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // set up an abstract state for the tabs directive
    .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

    .state('tabs.request', {
    url: "/request",
    views: {
      'request-tab': {
        templateUrl: "templates/request.html"
      }
    }
  });

   $urlRouterProvider.otherwise("/login");

})


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please try again.'
            });
        });
    }
    // Simulate a login delay (15 s). Replace with your login code
    $timeout(function() {
      $scope.closeLogin();
    }, 15000);  
})

//uncomment below once you create a form view

// app.controller('LoginCtrl', function($scope, $ionicModal, $timeout){

//   // Form data for the login modal
//   $scope.loginData = {};

//     // Create the login modal
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });


//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

    // // Simulate a login delay (15 s). Replace with your login code
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 15000);  
// })


app.controller('RequestCtrl', function($scope){

});