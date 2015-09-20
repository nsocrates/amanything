'use strict';

angular.module('amanythingApp')
  .factory('postService', function($resource) {
   return $resource('/api/things/:posted_on');
  })

  .controller('MainCtrl', function ($scope, $http, Auth, postService, $routeParams) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.newThing = { created_by: '', text: '', created_at: '', username: '', posted_on: '', reply: '' };

    var posted_on = $routeParams.posted_on;
    $http.get('/api/things/' + posted_on).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.post = function(form) {
      $scope.submitted = true;
      if (form.$valid) { $scope.addThing(); }
    };

    $scope.addThing = function() {
      $scope.newThing.created_by = $scope.getCurrentUser().name;
      $scope.newThing.username = $scope.getCurrentUser().username;
      $scope.newThing.created_at = Date.now();
      $scope.newThing.posted_on = posted_on;
      postService.save($scope.newThing, function() {

        $http.get('/api/things/' + posted_on).success(function(awesomeThings) {
          $scope.awesomeThings = awesomeThings;
        });

        $scope.newThing = { created_by: '', text: '', created_at: '', username: '', posted_on: '', reply: '' };
        $scope.submitted = false;
      });
    };
  });
