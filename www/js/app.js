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

app.config(function ($stateProvider, $urlRouterProvider){
  // Ionic uses AngularUI Router, which uses the concept of states.
  // More info can be found here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // set up an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tab.html'
  })

  //login route
    .state('index', {
    url: "/index",
    templateUrl: "index.html",
    controller: 'LoginCtrl'
      })

  // prequalification form
    .state('request', {
      url: "/request",
      templateUrl: "request.html",
      controller: "RequestCtrl"
    })

   $urlRouterProvider.otherwise("/tab/login");

})

//HTTP requests with Ionic from: https://blog.nraboy.com/2014/08/make-http-requests-android-ios-ionicframework/

app.controller('LoginCtrl', function($scope, $http/*, LoginService, $ionicPopup, $state*/) {
  // $scope.data = {};
  $scope.getData = function() {
    $http.get("http://portal1rexcom-stage.elasticbeanstalk.com/authorize/signin", { params: { "email": "admin@1rex.com", "password": "shareable" } })
        .success(function(data) {
          $scope.email = data.email;
          $scope.password = data.password;
        })
        .error(function(data) {
          alert("ERROR");
        });
  }


  // $scope.login = function() {
  //     LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
  //         $state.go('request');
  //     }).error(function(data) {
  //         var alertPopup = $ionicPopup.alert({
  //             title: 'Login failed.',
  //             template: 'Please try again.'
  //         });
  //     });
  // }


// validate login --> log you into server

 var loginInfo = {email:'admin@1rex.com', password:'shareable'}
    $http({
    url: "http://portal1rexcom-stage.elasticbeanstalk.com/authorize/signin",
    method: "POST",
    params: loginInfo
    })
 
   //store json and read out phone number

  var json = 
    $http({
    var email = angular.fromJson(json)["email"],
    var phone = angular.fromJson(json)["phone"],  
    url: "http://portal1rexcom-stage.elasticbeanstalk.com/user/search/:email",
    method: "GET",
    params: {email: 'email', password: 'phone'}
    })

    // store these and check to see if the email in the form matches the information the data that's returned from the API. If match, then redirect to prequal page. Else error. 

 

})



    
    // Simulate a login delay (15 s). Replace with your login code
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 15000);  

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