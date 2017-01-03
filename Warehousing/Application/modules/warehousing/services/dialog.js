define([], function () {
    angular.module('warehousing').service('$dialog', function ($uibModal) {
        this.showConfirmationDialog = function (options) {
            var modalInstance = $uibModal.open({
                templateUrl: window.baseUrl + 'Application/modules/warehousing/views/dialog.html',
                controller: 'dialog',                
                resolve: {
                    options: options
                },
                backdrop: 'static'
            });

            return modalInstance.result;
        }
    });
});