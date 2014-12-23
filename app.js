(function ( angular ) {

var app = angular.module('store', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

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

.controller('CategoryController', [ '$http', '$routeParams', '$route', '$location', function($http, $routeParams, $route, $location){
	var store = this;
	this.$route = $route;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.manufacturer = $routeParams.manufacturer;
	this.offer = [];
	this.categories = [];
	this.apiArgs = 'manufacturer=' + this.manufacturer;
	console.log(this.$routeParams.category);
	
	if('category' in this.$routeParams) {
		this.category = $routeParams.category;
		this.apiArgs = this.apiArgs + '&categoryPath.name=' + this.category;
	}

	$http.get('http://api.remix.bestbuy.com/v1/products(' + store.apiArgs + ')?format=json&show=categoryPath.name,categoryPath.id,sku,name,salePrice&apiKey=y7ne8hezdwv8dxa3j8ncgxfn')
	.success(function(data) {
			store.offers = data.products;
			store.offers.forEach(function(each){
				if (objectArrayContains(store.categories, each.categoryPath[1].id, 'id')) {
					store.categories.push({
						'name': each.categoryPath[1].name,
						'id': each.categoryPath[1].id
					});
				}
			});
			console.log(store.categories);
	}).error( function (data, status) {
		console.log(status);
		console.log(store.apiArgs);
	});

}]);

function objectArrayContains(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return false;
    }
    return -1;
}

})(window.angular);