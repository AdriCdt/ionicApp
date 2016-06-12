angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};

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

  $scope.doRegister  = function(){

      var count = Object.keys($scope.registerData).length;
      $scope.registerData = angular.toJson($scope.registerData);
      console.log($scope.registerData);

      console.log(count);
      if (count == 3){
      $http({
          method: 'POST',
          url: "http://localhost:7000/PHPSportAPI/login/register.php",
          data: $scope.registerData

      }).success(
          function(){
              $http.get("http://localhost:7000/PHPSportAPI/login/register.php").success(
                  function(message){
                      var messageRegister = message;
                      var count = Object.keys(messageRegister).length;

                      if (count == 1){
                          $scope.registerData = {};
                          $scope.content = "<b style='color: red'>"+messageRegister.message+"</b>";
                      }else{
                          $location.path('/login');
                      }


                  }
              )
          }
      )

      }else {
          $scope.content = "<b style='color: red'>Tout les champs sont à remplir</b>";
          $scope.registerData = {};
      }
  };





  $scope.doLogin = function() {


      $scope.loginData = angular.toJson($scope.loginData);
      console.log($scope.loginData);
      $http({
          method: 'POST',
          url: "http://localhost:7000/PHPSportAPI/login/login.php",
          data: $scope.loginData

      }).success(function(response) {
          $http.get("http://localhost:7000/PHPSportAPI/login/login.php")
              .success(function(user){
                  var message = user;

                  var count = Object.keys(message).length;
                  console.log(count);


                  if(count == 1){

                      $scope.message = message.message;
                      console.log($scope.message);
                      $scope.loginData = {};
                      $scope.content = "<b style='color: red'>"+$scope.message+"</b>";







                  }else{

                      $scope.globalUserID = message.id;
                      $scope.globalName = message.name;
                      $scope.globalmail = message.email;
                      $location.path('/');


                  }



              })
              .error(function(events){
                  alert("fais gaffe a toi fréro");
              })


      }).error(function(response) {

          alert('This is embarassing. An error has occured. Please check the log for details');
      });
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000*/
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
        $http.get("http://localhost:7000/PHPSportAPI/events.php")
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
        $http.get("http://localhost:7000/PHPSportAPI/sport.php")
            .success(function(sports){
                $scope.sports = sports;
            })
            .error(function(sports){
                alert("fais gaffe a toi, pas de sport");
            })
    };

    $scope.event= {"user_id": "1",
                    "sport_id":"1",
                    "duration" : "1h30"};
    $scope.send = function(){

       console.log($scope.event);



        $http({
            method: 'POST',
            url: "http://localhost/ApiAppliv2/public/store",
            data: event

        }).success(function(response) {
            alert('yay');

        }).error(function(response) {

            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }
})

.controller('FilterCtrl', function ($scope,$http) {
    $scope.sportFilter=[];
    $scope.getSportFilter=function () {
        $http.get("http://localhost/ApiAppliv2/public/sport")
            .success(function(sports){
                $scope.sports = sports;
            })
            .error(function(sports){
                alert("fais gaffe a toi, pas de sport");
            })
    }
    
})


.controller('SendSportCtrl', function ($scope, $http){

    $scope.sport ={};
    $scope.sendSport = function(){
        console.log($scope.sport);
        $http({
            method: 'POST',
            url: "http://localhost/ApiAppliv2/public/store",
            data: $scope.sport

        }).success(function(response) {
            alert('yay');

        }).error(function(response) {

            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }

});
