angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


//test alex, ne pas dérangé!

.controller('GetEventCtrl', function ($scope, $http) {
    $scope.sports = [];
    $scope.getData = function () {
        $http.get("http://localhost/ApiAppliv2/public/event")
            .success(function(events){
              $scope.events = events;

            })
            .error(function(events){
              alert("fais gaffe a toi fréro");
            })
  }
})



.controller('CreateEventCtrl', function ($scope, ionicTimePicker, $http) {

    var ipObj1 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                var selectedTime = new Date(val * 1000);

                if(selectedTime.getUTCMinutes() == 0){
                    $scope.time = '<p>'+selectedTime.getUTCHours()+' h 00</p>'
                }
                else{
                    $scope.time = '<p>'+selectedTime.getUTCHours()+' h '+selectedTime.getUTCMinutes()+'</p>';
                }

                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Ok'    //Optional
    };

    $scope.callTime = function() {
        ionicTimePicker.openTimePicker(ipObj1);
    };
    $scope.sports = [];
    $scope.getSports = function () {
        $http.get("http://localhost/ApiAppliv2/public/sport")
            .success(function(sports){
                $scope.sports = sports;
            })
            .error(function(sports){
                alert("fais gaffe a toi, pas de sport");
            })
    }
});