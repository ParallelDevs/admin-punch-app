var app_controllers = angular.module('drupalionic.controllers', ['drupalionic.services']);


/*
* Application Controller
*/
app_controllers.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $ionicPopup, Account, Auth, $location, $state,$ionicHistory, punchState) {


  if( Auth.isLoggedIn() ){
    $rootScope.isLoggedIn = true;
  }else{
    $rootScope.isLoggedIn = false;
  }

    $scope.doLogout = function () {
        var token = Auth.getUserData('token');
        var url = localStorage.getItem('url');
        var endpoint = localStorage.getItem('endpoint');

        Account.logout(token, url, endpoint).then(function () {
            $rootScope.isLoggedIn = false;
            alert("Successfully Logged out");
            localStorage.setItem('sessionStateUser', 'out');
            $ionicHistory.nextViewOptions({disableBack: true});
            $location.path('inicio');
        });
    };
  
    $scope.doLogin = function (user) {


        var url = localStorage.getItem('url');
        var endpoint = localStorage.getItem('endpoint');


        if (localStorage.getItem('sessionStateUser') == null || localStorage.getItem('sessionStateUser') == 'out') {

            Account.login(user.username, user.password, url, endpoint).then(function (data) {

                $scope.user = data;

                //Saves the user data to localstorage
                Auth.setUserData('sessid', data.sessid);
                Auth.setUserData('token', data.token);

                //Set the loggedIn flag to 'true'
                $rootScope.isLoggedIn = true;

                //Show Alert on device
                alert("Successfully Logged in");
                punchState.getPunchLogin(Auth.getUserData('sessid')).then(function (data) {
                    var stateValue = data;
                    localStorage.setItem('state', stateValue);
                });
                localStorage.setItem('sessionStateUser', 'in');
                $ionicHistory.nextViewOptions({disableBack: true});
                $state.go('app.admin_punch');

            }, function (data) {
                alert("There has been an error trying to login");

            });
        } else {
          //  alert("Estaba logeado");
            var token = Auth.getUserData('token');
            localStorage.setItem('userData', user.username);
            localStorage.setItem('passData', user.password);
            Account.logout(token, url, endpoint).then(function () {
                $rootScope.isLoggedIn = false;
              //  alert("Lo desloguie");

                //**********
              //  alert("Voy a pasar a log in");
              //  alert("llevo " + localStorage.getItem('userData') + '----' + localStorage.getItem('passData'));
                Account.login(localStorage.getItem('userData'), localStorage.getItem('passData'), url, endpoint).then(function (data) {
              //      alert("Entre en log in");
                    $scope.user = data;

                    //Saves the user data to localstorage
                    Auth.setUserData('sessid', data.sessid);
                    Auth.setUserData('token', data.token);

                    //Set the loggedIn flag to 'true'
                    $rootScope.isLoggedIn = true;

                    //Show Alert on device
                    alert("Successfully Logged in");
                    punchState.getPunchLogin(Auth.getUserData('sessid')).then(function (data) {
                        var stateValue = data;
                        localStorage.setItem('state', stateValue);
                    });
                    localStorage.setItem('sessionStateUser', 'in');
                    $ionicHistory.nextViewOptions({disableBack: true});
                    $state.go('app.admin_punch');

                }, function (data) {
                    alert("There has been an error trying to login");

                });

            });
        }
    };
});


/*
* Account Controller
*/
app_controllers.controller('PunchCtrl', function ($scope, Account, Auth,punchState) {

    $scope.toggle = true;
    
   // $scope.$assignState = function(){
     // $scope.punchValue =  localStorage.getItem('state');
   //  };
   
   $scope.$watch(function () {
       $scope.punchValue =  localStorage.getItem('state');
    });

     $scope.getButton = function() {
     punchState.getPunchLogin(Auth.getUserData('sessid')).then(function(data){
  
      
     if (data == "Punch In") {
        localStorage.setItem('state', "Punch Out");
        $scope.punchValue = localStorage.getItem('state');
      } else {
        localStorage.setItem('state', "Punch In");
        $scope.punchValue = localStorage.getItem('state');
      } 
    },
     function(data){
       alert("An error has occurred, please try again");
     }
   );
  };
    
    

    $scope.punch = function () {
        Account.getPunch(Auth.getUserData('sessid')).then(function (data) {
            Account.punch(Auth.getUserData('sessid')).then(function (data) {
                alert("Punch successful");
            }, function (data) {
                alert("There has been an error doing the Punch. Please try again");
            });
        },
               function (data) {
                    alert("An error has ocurred. Check your internet connection and try again");
                }
        );
    };

});

app_controllers.controller('SettingsCtrl', function ($scope, Account, $state) {


    if (localStorage.getItem('url') == null && localStorage.getItem('endpoint') == null) {
        $scope.URL = "Undefined";
        $scope.ENDPOINT = "Undefined";
    } else {
        $scope.URL = localStorage.getItem('url');
        $scope.ENDPOINT = localStorage.getItem('endpoint');
    }
    $scope.settingsPunch = function (user) {
        localStorage.setItem('url', user.url);
        localStorage.setItem('endpoint', user.endpoint);
    };
    $scope.loadData = function () {
        $scope.URL = localStorage.getItem('url');
        $scope.ENDPOINT = localStorage.getItem('endpoint');
        alert("Your data was saved correctly");
    };

});