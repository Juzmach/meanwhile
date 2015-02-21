/**
 * Created by Tsarpf on 2/14/15.
 */

angular.module('meanwhileControllers').controller("PinterestController", ['$scope', '$http', function($scope, $http) {

    $scope.results = [];
    $scope.loaded = false;

    var from = 0;
    var increment = 10;
    var to = from + increment;

    $scope.getContent = function() {
	console.log('oh hi');
	var reqObj = {
		url: '/pinterest/',
		params: {from: from, to: to} 
	}
	from += increment;
	to += increment;

        $http.get(reqObj).
            success(function(data, status, headers, config) {
                $scope.results = data;
		console.log(data);
            }).
            error(function(data, status, headers, config) {
		console.log(data);
            });
    };

    $scope.getContent();
}]);
