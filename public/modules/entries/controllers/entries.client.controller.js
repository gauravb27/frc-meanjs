'use strict';

angular.module('entries').controller('EntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Entries',
	function($scope, $stateParams, $location, Authentication, Entries) {
		$scope.authentication = Authentication;

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
				telestack1tote: this.telestack1tote,
				telestack1bin: this.telestack1bin,
				telestack1litter: this.telestack1litter,
				score: this.score,
				comments: this.comments,
				created: this.created,
				user: this.user
			});
			entry.$save(function(response) {
				$location.path('entries/' + response._id);

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
                $scope.telestack1tote =0;
                $scope.telestack1bin =0;
                $scope.telestack1litter =0; 	
                $scope.score=0;			
				$scope.comments= '';
				$scope.created= '';
				$scope.user= '';

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
	}
]);