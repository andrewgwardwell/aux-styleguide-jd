'use strict';

angular.module('user')
  .directive('color', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        modifiers: modifiers
      },
      templateUrl: './js/templates/color.html' 
    };
  }]);