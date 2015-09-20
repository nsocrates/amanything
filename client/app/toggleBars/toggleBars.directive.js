'use strict';

angular.module('amanythingApp')
  .directive('toggleBars', function () {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        element.bind('click', function() {
			var topBar = document.getElementById('top-bar');
			var topBarContainer = document.getElementById('top-bar-container');

        	topBar.classList.toggle('uncollapse-top-bar');
        	topBarContainer.classList.toggle('uncollapse-container');
        });
      }
    };
  });