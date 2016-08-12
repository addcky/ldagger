var app = angular.module('lifetools',['ngRoute']);
app.config(function($routeProvidver){
	$routeProvider.when('/index',{
		controller:'indexCtrl',
		templateUrl:'view/history.html'
	}).otherwise({redirectTo:'/index'});
});
