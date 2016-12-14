var app_config = angular.module('drupalionic.configuration', []);


/**
* REPLACE HERE YOUR DRUPAL INSTANCE URL AND API ENDPOINT DEFINED ON YOUR SERVICES
* drupal_instance could be 'http://dev-example.pantheon.io/'
* api_endpoint could be: api/v1/
**/

//var url = localStorage.getItem('url');
//var endpoint = localStorage.getItem('endpoint');
app_config.constant('drupal_instance','');
app_config.constant('api_endpoint','');

//app_config.constant('drupal_instance','http://dev-punch-in-and-out.pantheonsite.io/');
//app_config.constant('api_endpoint','adminpunch/api/');