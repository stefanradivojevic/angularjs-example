'use strict';

angular
	.module('searchModule', ['ngAnimate'])
  	.directive('mySearch', ['searchService', 'exchangeService', function(searchService, exchangeService) {
  		return{
			templateUrl: 'templates/searchengine.html',
			restrict: 'C',
			replace: false,
			scope: {},
			link: function(scope, element, attrs){
		        	// variables
		        	scope.showResults = true;
		        	scope.inputField = document.getElementById('searchInput');
		        	scope.searchlist = document.getElementById('searchlist');
		        	scope.noSearchResults = false;
		        	
		        	// services
					searchService.async().then(function(response) {
	  					scope.restaurants = response.results;
	  				});

		        	// callbacks on events
		        	scope.toggleResultsList = function () {
		        		scope.showResults = true;
		        	};
		        	scope.hideEmptyList = function () {
	        				if (scope.searchlist.getElementsByTagName('li').length == 0) {
					        	scope.noSearchResults = true;
					        }
						    else {
						    	scope.noSearchResults = false;
						    }
		        	};
	  				scope.selectRestaurant = function (chosen) { // for ng-click event
						exchangeService.setData(chosen);
		        		scope.inputField.value = '';
		        		scope.showResults = false;
        			};

        			// event listeners
		        	scope.inputField.addEventListener("focus", scope.toggleResultsList);
		        	scope.inputField.addEventListener("keydown", scope.hideEmptyList);
			}
		};
 	 }])
	.directive('myChosenOne', ['exchangeService', function(exchangeService) {
		return{
			templateUrl: 'templates/thechosenone.html',
			restrict: 'C',
			replace: false,
			scope: {},
			link: function(scope, element, attrs){
	        	// variables
				scope.chosenRestaurant = {};

	        	// services
			    scope.$watch(function () {
			        return exchangeService.getData();
			    }, function (newData) {
			    	scope.chosenRestaurant = newData;
   				});
			}
		};
	}]);
