'use strict';

angular.module('amanythingApp')
  .factory('postService', function($resource) {
	return $resource('/api/things/:posted_on');
  })

  .controller('WallCtrl', function ($scope, $routeParams, $http, postService, Auth) {
    var username = $routeParams.username;

    $http.get('/api/users/' + username).success(function(awesomeUser) {
		$scope.awesomeUser = awesomeUser;
    });

    $scope.owner = function() {
    	return $scope.getCurrentUser().username === username;
    };

    $scope.getThings = function() {
	    $http.get('/api/things/' + username).success(function(awesomeThings) {
	      $scope.awesomeThings = awesomeThings;
	    });
    };

    $scope.isLoggedIn = Auth.isLoggedIn;
	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.newThing = { created_by: '', text: '', created_at: '', username: '', posted_on: '', reply: '' };
    $scope.thingWithId = { created_by: '', text: '', created_at: '', username: '', posted_on: '', reply: '' };
    $scope.getThings();
    if ($scope.getCurrentUser().name) { $scope.newThing.created_by = $scope.getCurrentUser().name; }

    $scope.post = function(form) {
		$scope.submitted = true;
		if (form.$valid) { $scope.addThing(); }
    };

    $scope.addThing = function() {
		$scope.newThing.created_at = Date.now();
		$scope.newThing.username = $scope.getCurrentUser().username;
		$scope.newThing.posted_on = username;
		postService.save($scope.newThing, function() {
		    $scope.getThings();
	        $scope.newThing = { created_by: '', text: '', created_at: '', username: '', posted_on: '', reply: '' };
	        if ($scope.getCurrentUser().name) { $scope.newThing.created_by = $scope.getCurrentUser().name; }
	        $scope.submitted = false;
		});
    };

    $scope.reply = function(thing) {
    	$http.get('/api/things/' + username + '/' + thing._id).success(function(thingWithId) {
    		$scope.thingWithId.created_by = thingWithId.created_by;
    		$scope.thingWithId.text = thingWithId.text;
    		$scope.thingWithId.created_at = thingWithId.created_at;
    		$scope.thingWithId.username = thingWithId.username;
    		$scope.thingWithId.posted_on = thingWithId.posted_on;
    		$http.put('/api/things/' + thing._id, $scope.thingWithId).success(function() {
    			$scope.thingWithId.reply = '';
    			$scope.getThings();
    		});
    	});
    };

    $scope.deleteThing = function(thing) {
		$http.delete('/api/things/' + thing._id);
		$scope.getThings();
    };
  });
