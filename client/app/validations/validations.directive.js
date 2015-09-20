'use strict';

var INTEGER_REGEXP = /^[0-9]/;
var SPECIAL_REGEXP = /[^a-zA-Z0-9]/;

var match = function() {
	return {
		require: 'ngModel',
		scope: { otherValue: '=match' },
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.match = function(modelValue, viewValue) {
				return (viewValue === scope.otherValue);
			};
			scope.$watch('otherValue', function() {
				ctrl.$validate();
			});
		}
	};
};

var special = function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.special = function(modelValue, viewValue) {
				return (!SPECIAL_REGEXP.test(viewValue));
			};
		}
	};
};

var number = function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.number = function(modelValue, viewValue) {
				return (!INTEGER_REGEXP.test(viewValue));
			};
		}
	};
};

angular.module('amanythingApp')
	.directive('match', match)
	.directive('special', special)
	.directive('number', number);
