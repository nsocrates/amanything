'use strict';

angular.module('amanythingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:posted_on', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
