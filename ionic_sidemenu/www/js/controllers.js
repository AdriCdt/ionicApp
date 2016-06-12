angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $location, $stateParams) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal




  $scope.loginData = {};
  $scope.registerData = {};



  //Fonction de création de compte

  $scope.doRegister  = function(){
        //recupere le contenu du formulaire, me donne sa taille
      var count = Object.keys($scope.registerData).length;
      $scope.registerData = angular.toJson($scope.registerData);
      console.log($scope.registerData);

      console.log(count);

      //formulaire plein
      if (count == 3){

          //push des données au serveur
      $http({
          method: 'POST',
          url: "http://localhost:7000/PHPSportAPI/login/register.php",
          data: $scope.registerData

      }).success(
          function(){
              //recu de la réponse
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
          //message d'erreur, vide la variable pour la reremplir
          $scope.content = "<b style='color: red'>Tout les champs sont à remplir</b>";
          $scope.registerData = {};
      }
  };



//pareil que pour le register
    //t'envoie les données, si sa passe pas erreur, si sa passe tu recois et stock l'id, l'email et le user name

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

.controller('SingleCtrl', function($scope, $stateParams, $http) {

    var id = $stateParams.id;

    $scope.single = [];
    $scope.getSingle = function (){
        $http.get('http://localhost:7000/PHPSportAPI/single.php?ID='+$stateParams.id)
            .success(function(response) {
                $scope.single = response;
                console.log($scope.single);
            });
    };




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

    $scope.event= {"name": $scope.globalName

                    };
    $scope.send = function(){




        $scope.event =  angular.toJson($scope.event);
        console.log($scope.event);
        $http({
            method: 'POST',
            url: "http://localhost:7000/PHPSportAPI/events.php",
            data: $scope.event

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
