angular.module('meanwhileControllers', ['infinite-scroll']);

var app = angular.module('meanwhile', [
    'ngAnimate',
    'ui.bootstrap',
    'akoenig.deckgrid',
    'ngRoute',
    'meanwhileControllers']);


app.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'partials/pinterest.html',
                controller: 'PinterestController'
            }).
            when('/cards/:cardId', {
                templateUrl: 'partials/card-details.html',
                controller: 'CardDetailController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);



