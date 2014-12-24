(function ( angular ) {
'use strict';

var app = angular.module('store', ['ngRoute', 'mgcrea.ngStrap', 'ngSanitize'])

.config(['$routeProvider', '$locationProvider', '$modalProvider', '$httpProvider', function($routeProvider, $locationProvider, $modalProvider, $httpProvider) {

	//
	// ALLOW THE CROSS-SITE API REQUESTS
	//
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
	$locationProvider.hashPrefix('');

	//
	// ROUTES THE URLS THE THE CONTROLLERS
	//
	$routeProvider
		.when('/maker/:manufacturer', {
			controller: 'CategoryController',
			templateUrl: 'store.html'
		})
		.when('/maker/:manufacturer/category/:category', {
			controller: 'CategoryController',
			templateUrl: 'store.html'
		});
}])

.controller('CategoryController', [ '$http', '$routeParams', '$route', '$location', '$modal', '$scope', '$sanitize', function($http, $routeParams, $route, $location, $modal, $scope, $sanitize){
	var store = this;
	this.$routeParams = $routeParams;
	this.manufacturer = $routeParams.manufacturer;
	this.offer = [];
	this.categories = [];
	this.apiArgs = 'manufacturer=' + this.manufacturer;
	
	//
	// BUILD THE SEARCH ARGUMENTS, IF /CATEGORY IS IN URL
	//
	if('category' in this.$routeParams) {
		this.category = $routeParams.category;
		this.apiArgs = this.apiArgs + '&categoryPath.id=' + this.category;
	}

	$http.get('http://api.remix.bestbuy.com/v1/products(' + store.apiArgs + '&largeFrontImage=*)?format=json&show=categoryPath.name,categoryPath.id,sku,name,salePrice,thumbnailImage,largeFrontImage&apiKey=y7ne8hezdwv8dxa3j8ncgxfn')
	.success(function(data) {
			store.offers = data.products;
			store.offers.forEach(function(each){
				if (objectUniqueToArray(store.categories, each.categoryPath[1].id, 'id')) {
					store.categories.push({
						'name': each.categoryPath[1].name,
						'id': each.categoryPath[1].id
					});
				}
			});
	})
	.error( function (data, status) {
		console.log(status + "error");
	});


	//
	// CONTROLS OFFER DETAILS POP-UP
	//
	$scope.modal = {
		html: true
	};

	// var offerDetailsHtml = $modal({title: 'my title'});

	// $scope.offerDetailsHtml = {title: 'fart', contentTemplate: 'modal.html'};

	// $scope.modal = {title: 'this ', content: 'CategoryController', show: true};

}]);

//
// FUNCTION TO CHECK IF OBJECT ALREADY EXISTS IN ARRAY OF OBJECTS
//
function objectUniqueToArray(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return false;
    }
    return -1;
}

})(window.angular);