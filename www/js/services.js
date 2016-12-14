/**
 * Application services module
 */
var app_services = angular.module('drupalionic.services', ['drupalionic.configuration']);


/**
 * Account factory that holds logic for login, logout and punch in, punch out
 * It uses $q to handle promises and $http for requess
 */


app_services.factory('punchState', function ($http, $q) {
    
  
   return {  
       getPunchLogin : function(userSessId){
       var defer = $q.defer();
           $http({
           method        :'GET',
           url           : localStorage.getItem('url') + 'api/userpunch',
           dataType      : 'json',
           crossDomain   : true,
           /*data          : {
             name : username,
             pass : password,
             mail : email
           }*/
           headers       : {
             "Content-Type": "application/x-www-form-urlencoded",
             "Authorization": "Basic " + userSessId + "|123xz"
           }
         })

         .success(function(data, status, headers, config){
         //  alert("si get punch  login  "+data);
           defer.resolve(data);
         })
         .error(function(data, status, headers, config){
      //   alert("no get punch"+data+"-------"+userSessId);
             defer.reject(data);
         });

         return defer.promise;

     },
           
   }; 
});


app_services.factory('Account', function ($http, $q, drupal_instance, api_endpoint) {


    return {
        /*
         * User logout
         */
        logout: function (token, url, endpoint) {

            var defer = $q.defer();
            var api_endpoint = endpoint;
            var drupal_instance = url;
            $http({
                method: 'POST',
                url: drupal_instance + api_endpoint + 'user/logout',
                dataType: 'json',
                crossDomain: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRF-Token": token
                }
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })

                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });

            return defer.promise;
        },
        
        /*
         * User login
         */
        login: function (username, password, url, endpoint) {

            var defer = $q.defer();
            var api_endpoint = endpoint;
            var drupal_instance = url;
            $http({
                method: 'POST',
                url: drupal_instance + api_endpoint + 'user/login',
                dataType: 'json',
                crossDomain: true,
                data: 'username=' + username + '&password=' + password,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"

                }
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })

                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });

            return defer.promise;
        },
        
        getPunch: function (userSessId) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: localStorage.getItem('url') + 'api/userpunch',
                dataType: 'json',
                crossDomain: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + userSessId + "|123xz"

                }
            })
                    .success(function (data, status, headers, config) {
                        localStorage.setItem("testex", data);
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
            return defer.promise;

        },

        
        punch: function (sessid) {
            var defer = $q.defer();

            if (localStorage.getItem("testex") == "Punch In") {
                punchesz = "POST";
            } else {
                punchesz = "PUT";
            }

            $http({
                method: punchesz,
                url: localStorage.getItem('url') + 'api/userpunch',
                dataType: 'json',
                crossDomain: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + sessid + "|123xz"

                }
            })
                    .success(function (data, status, headers, config) {

                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {

                        defer.reject(data);
                    });
            return defer.promise;
        },
        
       

        
        
    };
});

/**
 * Auth factory that holds logic and data regarding the user across the app
 */
app_services.factory('Auth', function ($window) {

    var currentUser;

    return {
        //Set the user data to use accross the app, this is saved when loggedIn
        setUserData: function (key, value) {
            $window.localStorage[key] = value;
        },
        //Get the currentUser data
        getUserData: function (key) {
            return $window.localStorage[key] || '{}';
        },
        //Helper function to know if the user is loggedIn or not
        isLoggedIn: function () {

            currentUser = $window.localStorage['user'];

            if ((typeof currentUser === "object") && (currentUser !== null)) {
                return true;
            } else {
                return false;
            }
        }
    };
});

