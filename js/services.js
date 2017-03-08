'use strict';

angular
	.module('AngularApp')
	.factory('searchService', function($http) {
		  var searchService = {
		    async: function() {
		      var promise = $http.get('js/restaurants.json').then(function (response) {
		        return response.data;
		      });
		      return promise;
		    }
		  };
		  return searchService;
	})
	.factory('exchangeService', function() {
    		var exchangeService = {}

            exchangeService.dataForExchange = {};
    
            exchangeService.setData = function(newRestaurant) {
	            exchangeService.dataForExchange = newRestaurant;
            };
            
            exchangeService.getData = function() {
	            return exchangeService.dataForExchange;
            };

            return exchangeService;
        });