angular.module('meanwhileControllers').controller("CardDetailController", ['$scope','$routeParams',
    function($scope,$routeParams){
    $scope.cardId = $routeParams.cardId;
}]);
