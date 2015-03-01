'use strict';

angular.module('entries').controller('EntriesController', ['$filter', '$scope', '$stateParams', '$location', 'Authentication', 'Entries',
	function($filter, $scope, $stateParams, $location, Authentication, Entries) {
		$scope.authentication = Authentication;

		var oldEntry = '';
		var resetStackInformation = function() {
			$scope.scoredGamePieces = {
				totalTotes: 0,
				totalBins: 0,
				totalLitter: 0
			};
			$scope.zone = 3;
			$scope.teamSearch = '';
			$scope.filteredEntries = $scope.entries;
		};

		resetStackInformation();

		$scope.create = function() {
			var entry = new Entries({
				match: this.match,
				team: this.team,
				alliance: this.alliance,
				spos: this.spos,
				botset: this.botset,
				toteset: this.toteset,
				binset: this.binset,
				autontotetack:  this.autontotestack,
				autontotestackzone: this.autontotestackzone,
				coop: this.coop,
				totes: this.scoredGamePieces.totalTotes,
				bins: this.scoredGamePieces.totalBins,
				stackLitter: this.scoredGamePieces.totalLitter,
				litter: this.litter,
				score: this.score,
				comments: this.comments,
				created: this.created,
				user: this.user,
				zone: this.zone
			});
			entry.$save(function(response) {
				$location.path('entries/' + response._id);
				resetStackInformation();
				$scope.match= 0;				
				$scope.team= 1;
				$scope.alliance='';
				$scope.spos='';
				$scope.botset= 0;   			
                $scope.toteset= 0;
                $scope.binset = 0;
                $scope.autontotestack =0;	
                $scope.autototestackzone =0;
                $scope.coop =0;
				$scope.totes = $scope.scoredGamePieces.totalTotes;
				$scope.bins = $scope.scoredGamePieces.totalBins;
				$scope.stackLitter = $scope.scoredGamePieces.totalLitter;
				$scope.litter = 0;
                $scope.score=0;			
				$scope.comments= '';
				$scope.created= '';
				$scope.user= '';
				$scope.zone= '3';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(entry) {
			if (entry) {
				entry.$remove();

				for (var i in $scope.entries) {
					if ($scope.entries[i] === entry) {
						$scope.entries.splice(i, 1);
					}
				}
			} else {
				$scope.entry.$remove(function() {
					$location.path('entries');
				});
			}
		};

		$scope.update = function() {
			var entry = $scope.entry;

			entry.$update(function() {
				$location.path('entries/' + entry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.entries = Entries.query();
		};

		$scope.findOne = function() {
			$scope.entry = Entries.get({
				entryId: $stateParams.entryId
			});
		};

		$scope.sumOfResults = function() {
			$scope.sum = {
				spos: 0,
				botset: 0,
				toteset: 0,
				binset: 0,
				autontotestack: 0,
				autontotestackzone: 0,
				coop: 0,
				totes: 0,
				bins: 0,
				stackLitter: 0,
				litter: 0
			};

console.log($scope.filteredEntries);
			for (var i = 0; i < $scope.filteredEntries.length-1; i++) {
      			for (var key in $scope.sum) {
        			$scope.sum[key] += $scope.filteredEntries[i][key];
        		}
        	}
		};
	}
]);