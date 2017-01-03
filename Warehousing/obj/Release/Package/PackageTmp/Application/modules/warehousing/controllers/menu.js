define([], function () {
    angular.module('warehousing').controller('menu', function ($scope) {
        $scope.currentPage = 'ItemList';
        $scope.setCurrentPage = function (page) {
            $scope.currentPage = page;
        }        
    });
});