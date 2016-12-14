var app = angular.module('drupalionic', ['ionic', 'drupalionic.services', 'drupalionic.controllers']);


/* 
 * Ionic app and cordova run configuration
 * If you install any cordiva plugin configure it here
 * 
 */
app.run(function ($ionicPlatform, $rootScope) {

    //Set initial loggedIn state
    $rootScope.isLoggedIn = false;

    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

/* 
 * Ionic app configuration
 * Configure routes here
 * 
 */
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];



    $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.inicio', {
                url: "/inicio",
                views: {
                    'menuContent': {
                        templateUrl: "templates/inicio.html",
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.admin_punch', {
                url: "/admin_punch",
                views: {
                    'menuContent': {
                        templateUrl: "templates/admin_punch.html",
                        controller: 'PunchCtrl'
                    }
                }
            })

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html",
                        controller: 'SettingsCtrl'
                    }
                }
            });

    $urlRouterProvider.otherwise('/app/inicio');


});