angular.module('meanwhileControllers').controller("CardDetailController", ['$scope','$routeParams', '$http',
    function($scope,$routeParams,$http){
        $http.get('/mockpinterest/' + $routeParams.cardId).success(function(data){
            $scope.card = data;

            var prevCardId = parseInt($scope.card._id) - 1;

            if(prevCardId < 0){
                prevCardId = 0;
            }

            $scope.nextCard = parseInt($scope.card._id) + 1;
            $scope.prevCard = prevCardId;
        });
}]);
