/**
 * Created by Tsarpf on 2/14/15.
 */

angular.module('meanwhileControllers').controller("PinterestController", ['$scope', '$http', function($scope, $http) {
    $scope.results = [];
    $scope.loaded = false;
    $scope.getContent = function() {
        $http.get('/pinterest/').
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
