define([], function () {
    angular.module('warehousing').controller('editCycleCount', function ($scope, $proxy, $location, $common, $routeParams, $dialog, constants) {
        $scope.gridOptions = {            
            enablePagination: true,
            pagination: {
                currentPage: 1,
                pageSizes: [25, 50, 100],
                pageSize: 25             
            },
            columns: [
            {
                type: 'text',
                field: 'ProductName',
                displayName: 'Product',
                width: '30%'
            },
            {
                type: 'number',
                field: 'SystemQty',
                displayName: 'System Qty',
                width: '10%',

            },
            {
                type: 'number',
                field: 'ActualQty',
                displayName: 'Actual Qty',
                width: '10%',
                isEditable: true,
                onCellValueChanged: function (item) {
                    if (!!item.Id && item.ActualQty != item.OldActualQty) {
                        $proxy.updateCycleCountItem(item);
                    }
                    else if (!item.Id && !!item.ActualQty && item.ActualQty != item.OldActualQty) {
                        $proxy.createCycleCountItem(item).then(function (id) {
                            item.Id = id;
                        });
                    }

                    item.Variant = !!item.ActualQty ? item.SystemQty - item.ActualQty : null;

                    item.OldActualQty = item.ActualQty;
                }
            },
            {
                type: 'number',
                field: 'Variant',
                displayName: 'Variant',
                width: '10%'
            }
            ]
        }
            
        $scope.items = [];
        loadData();

        $scope.close = function () {
            $location.path('/cycleCounts');
        }

        $scope.complete = function () {
            $dialog.showConfirmationDialog({
                title: 'Complete Cycle Count',
                message: 'The cycle count cannot be edited once it\'s completed. Do you want to complete this cycle count?'
            }).then(function (dialogResult) {
                if (dialogResult == constants.DialogResult.Yes) {
                    $proxy.completeCycleCount($scope.cycleCount.Id).then(function () {
                        $location.path('/cycleCounts');
                    });
                }
            });
        }

        $scope.$watch('gridOptions.pagination.currentPage + gridOptions.pagination.pageSize', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                loadData();
            }            
        });

        function loadData() {
            $proxy.getCycleCountById($routeParams.id, $scope.gridOptions.pagination.pageSize, $scope.gridOptions.pagination.currentPage).then(function (cycleCount) {
                $scope.cycleCount = cycleCount;
                $scope.items = cycleCount.Items;
                $scope.gridOptions.pagination.totalItems = cycleCount.TotalItems;
                _.each($scope.items, function (item) {
                    item = _.extend(item, {
                        ProductName: item.Product.Name,
                        Variant: !!item.ActualQty ? item.SystemQty - item.ActualQty : null,
                        OldActualQty: item.ActualQty,
                        Product: null
                    });
                });
            });
        }
    }); 
});