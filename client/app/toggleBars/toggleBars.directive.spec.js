'use strict';

describe('Directive: toggleBars', function () {

  // load the directive's module
  beforeEach(module('amanythingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<toggle-bars></toggle-bars>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the toggleBars directive');
  }));
});