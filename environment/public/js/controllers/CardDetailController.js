angular.module('meanwhileControllers').controller("CardDetailController", ['$scope','$routeParams', '$http',
    function($scope,$routeParams,$http){
        $http.get('/pinterest/' + $routeParams.cardId).success(function(data){
            $scope.card = data;
        });
}]);
