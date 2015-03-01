'use strict';

angular.module('entries').directive('stackInputDirective', function() {
	return {
		replace: true,
		transclude: true,

		templateUrl: 'modules/entries/views/stacks-directive.view.html',

		scope: {
			stackNumber: '@',
			totalScoredObjects: '='
		},

		link: function(scope) {
			var oldToteCount = scope.toteStack = 0;
			scope.binOnStack = scope.litterOnStack = -1;

			scope.updateScoredObjects = function(objectId) {
				switch(objectId) {
					case 'tote':
						if (scope.toteStack > oldToteCount) {
							scope.totalScoredObjects.totalTotes++;
						} else {
							scope.totalScoredObjects.totalTotes--;
						}
						oldToteCount = scope.toteStack;
						if (oldToteCount === 6) {
							scope.litterOnStack = -1;
							scope.updateScoredObjects('bin');
							scope.litterOnStack = -1;
							scope.updateScoredObjects('litter');
						}
						break;
					case 'bin':
						scope.totalScoredObjects.totalBins += scope.binOnStack;
						if (scope.binOnStack === -1) {
							scope.litterOnStack = -1;
							scope.updateScoredObjects('litter');
						}
						break;
					case 'litter':
						scope.totalScoredObjects.totalLitter += scope.litterOnStack;
						if (scope.totalScoredObjects.totalLitter <= 0) {
							scope.totalScoredObjects.totalLitter = 0;
						}
						break;
					default:
						break;
				};
			}
		}
	}
});