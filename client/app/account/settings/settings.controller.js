'use strict';

angular.module('amanythingApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.submitChange = function(form) {

      if ($scope.user.newName) {
        Auth.changeName( $scope.user.newName)
            .then(function() {
              $scope.name_message = 'Name successfully changed. Refresh page to see changes.';
            })
            .catch(function() {
              $scope.errors.other = 'Error changing name';
              $scope.name_message = '';
            });
      }

      if ($scope.user.newPassword) $scope.changePassword(form);
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {

        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
