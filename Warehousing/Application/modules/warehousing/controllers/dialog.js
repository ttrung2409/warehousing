define([], function () {
    angular.module('warehousing').controller('dialog', function ($scope, $proxy, $uibModalInstance, $timeout, $q, constants, options) {
        options = _.extend({
            yesButtonCaption: 'Yes',
            noButtonCaption: 'No'
        }, options);

        $scope.options = options;

        $scope.yes = function () {
            $uibModalInstance.close(constants.DialogResult.Yes);
        };        

        $scope.no = function () {
            $uibModalInstance.close(constants.DialogResult.No);
        };              
    });
});