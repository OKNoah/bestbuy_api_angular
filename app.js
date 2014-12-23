(function ( angular ) {

var app = angular.module('store', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/maker/:manufacturer', {
			controller: 'CategoryController',
			templateUrl: 'store.html'
		});
}])

.controller('CategoryController', [ '$http', '$routeParams', '$route', '$location', function($http, $routeParams, $route, $location){
	var store = this;
	this.message = "hello world";
	this.$route = $route;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.offer = [];

	$http.get('http://api.remix.bestbuy.com/v1/products(manufacturer=' + store.$routeParams.manufacturer + ')?format=json&show=sku,name,salePrice&apiKey=y7ne8hezdwv8dxa3j8ncgxfn').success(function(data) {
			store.offers = data.products;
	}).error( function (data, status) {
		console.log(status);
		console.log(store.$routeParams);
	});

	$http.get('http://api.remix.bestbuy.com/v1/categories(name=' + store.$routeParams.manufacturer +')?format=json&apiKey=y7ne8hezdwv8dxa3j8ncgxfn').success(function(data) {
			store.categories = data.categories[0].subCategories;
			console.log(store.categories);
	}).error( function (data, status) {
		console.log(status);
		console.log(store.$routeParams);
	});

}]);

})(window.angular);