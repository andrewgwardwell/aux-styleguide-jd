(function() {
	'use strict';

	var ctrl =

		angular
		.module('app')
		.directive('formEl', function() {
			var ctrl = ['$scope', '$window', function($scope, $window) {
				var init = function() {
					if ($scope.type == 'dropdown') {
						var opts = $scope.options;
						opts = [{
							id: 1,
							name: "ted",
							level: 1,
							parent: 0
						}, {
							id: 3,
							name: "billy",
							level: 1,
							parent: 0
						},
						{
							id: 4,
							name: "Simon",
							level: 2,
							parent: 3
						},
						{
							id: 34,
							name: "Stu",
							level: 3,
							parent: 4
						}
						];
						$scope.itemArray = opts;
						$scope.selected = {
							value: $scope.itemArray[0]
						};
					}
				};
				init();
			}];
			return {
				restrict: 'E',
				replace: true,
				scope: {
					type: '@',
					options: '='
				},
				templateUrl: 'app/directives/form/formEl.html',
				controller: ctrl
			};
		});
})();