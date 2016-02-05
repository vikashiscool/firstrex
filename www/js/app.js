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
  $stateProvider
  //stateProvider determines which templates are injected where ion-nav-view is located in parent template (index.html)
  // set up an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tab.html'
  })

  //login route
    .state('home', {
    url: "/login",
    views: {
      login: {
        templateUrl: "login.html"
      }
    },
    controller: 'LoginCtrl'
      })

  // prequalification form
    .state('request', {
      url: "/request",
      views: {
        login: {
          templateUrl: "request.html"
      }
    },
      controller: "RequestCtrl"
    })

   $urlRouterProvider.otherwise("templates/login");

})

//HTTP requests with Ionic from: https://blog.nraboy.com/2014/08/make-http-requests-android-ios-ionicframework/

app.controller('LoginCtrl', function($scope, $http, /*, LoginService,*/ $ionicPopup, $state) {
  // $scope.data = {};
  $scope.getData = function() {
    $http.get("http://portal1rexcom-stage.elasticbeanstalk.com/authorize/signin", { params: { "email": "admin@1rex.com", "password": "shareable" } })
        .success(function(data) {
          $scope.email = data.email;
          $scope.password = data.password;
          $ionicViewService.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
        })
        .error(function(data) {
          alert("ERROR");
        });
  }

// validate login --> log you into server

 var loginInfo = {email:'admin@1rex.com', password:'shareable'}
    $http.post({"http://portal1rexcom-stage.elasticbeanstalk.com/authorize/signin", loginInfo})
      .success(function(data){
        $state.go('request');
    })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed',
          template: "Please check your credentials"
        })
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

    
})

app.controller('RequestCtrl', function($scope, $location, $ionicViewService) {
  if(window.localStorage.getItem("password") === "undefined" || window.localStorage.getItem("password") === null) {
      $ionicViewService.nextViewOptions({
        disableAnimate: true,
        disableBack: true
        });
      $location.path("/login");
  }
});

////////////////////////////
//Google Map Functinoality//
///////////////////////////

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
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



    // store these and check to see if the email in the form matches the information the data that's returned from the API. If match, then redirect to prequal page. Else error. 

 





    
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

