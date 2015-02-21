/**
 * Created by Tsarpf on 2/14/15.
 */

angular.module('meanwhileControllers').controller("PinterestController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.results = [];
    $scope.loaded = false;

    var from = 0;
    var increment = 20;
    var to = from + increment;

    $scope.getContent = function() {
	    console.log('oh hi');
	var reqObj = {
		params: {from: from, to: to}
	}
	from += increment;
	to += increment;

        $http.get('/pinterest/', reqObj).
            success(function(data, status, headers, config) {
                $scope.results = $scope.results.concat(data);
		        console.log(data);
            }).
            error(function(data, status, headers, config) {
		        console.log('error');
		        console.log(data);
            });
    };

    $scope.getContent();
}]);
