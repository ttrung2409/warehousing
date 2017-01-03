define([], function () {
    angular.module('warehousing').controller('addCycleCount', function ($scope, $proxy, $uibModalInstance, constants) {
        $scope = _.extend($scope, {
            selectedWarehouse: {},
            cycleCount: {},
            validator: {
                warehouse: {
                    valid: true,
                    message: '',
                    validate: validateWarehouse
                }
            }
        });

        $scope.ok = function () {
            angular.element('#form').submit();
        };

        $scope.onSubmit = function () {
            $scope.cycleCount.WarehouseId = $scope.selectedWarehouse.selected.Id;
            $scope.cycleCount.Status = constants.CycleCountStatus.Open;
            $uibModalInstance.close($scope.cycleCount);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $proxy.getAllWarehouses().then(function (results) {
            $scope.warehouses = results;
        });

        function validateWarehouse() {
            if (!$scope.selectedWarehouse.selected) {
                return {
                    valid: false,
                    message: 'Warehouse is required'                    
                }
            }            

            return true;
        }
    }); 
});