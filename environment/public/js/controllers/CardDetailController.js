angular.module('meanwhileControllers').controller("CardDetailController", ['$scope','$routeParams',
    function($scope,$routeParams){
        $scope.cardId = $routeParams.cardId;
        $scope.nextCard = parseInt($scope.cardId) + 1;
        $scope.prevCard = parseInt($scope.cardId) - 1;
}]);
