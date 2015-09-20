'use strict';

angular.module('amanythingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/wall/:username', {
        templateUrl: 'app/wall/wall.html',
        controller: 'WallCtrl'
      });
  });
