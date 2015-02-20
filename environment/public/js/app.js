var app = angular.module('meanwhile', ['ngAnimate', 'ui.bootstrap', 'akoenig.deckgrid']);

app.directive('discovery', function() {
    return {
        restrict: "E",
        templateUrl: 'partials/discovery',
        link: function(scope, element, attrs) {

        }
    };
});
