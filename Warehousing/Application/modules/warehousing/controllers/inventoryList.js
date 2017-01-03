define([], function () {
    angular.module('warehousing').controller('inventoryList', function ($scope, $proxy) {
        $scope = _.extend($scope, {
            selectedWarehouse: {}
        });

        $scope.gridOptions = {
            data: 'inventoryItems',
            enableColumnResize: true,
            totalItems: 'totalItems',
            paginationPageSizes: [50, 100, 200],
            paginationPageSize: 50,
            paginationCurrentPage: 1,
            enableHorizontalScrollbar: 2,
            useExternalPagination: true            
        };

        $scope.getProductsForLookUp = function (search, limit) {    
            return $proxy.getProductsForLookUp(search, limit).then(function (results) {
                return results;
            });
        }

        $scope.filter = function () {           
            populateColumns();
            getPagedData();
        }
        
        $scope.$watch('gridOptions.paginationPageSize + gridOptions.paginationCurrentPage', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                getPagedData();
            }
        }, true);        

        $proxy.getAllWarehouses().then(function (warehouses) {
            $scope.warehouses = warehouses;           
            $scope.warehouses.unshift({
                Id: 0,
                Name: 'All Warehouses'
            });

            populateColumns();
        });        

        getPagedData();

        function getPagedData() {
            $proxy.getInventoryList(
                $scope.gridOptions.paginationPageSize,
                $scope.gridOptions.paginationCurrentPage,
                !!$scope.selectedProduct ? $scope.selectedProduct.Id : null,
                !!$scope.selectedWarehouse.selected && $scope.selectedWarehouse.selected.Id != 0 ? $scope.selectedWarehouse.selected.Id : null)
                .then(function (result) {
                    var inventoryItems = result.Data;
                    var groups = _.groupBy(inventoryItems, function (item) {
                        return item.ProductId;
                    });

                    $scope.inventoryItems = [];
                    _.each(groups, function (group) {
                        var inventoryItem = group[0];
                        _.each(group, function (item) {
                            if (!!item.WarehouseId) {
                                inventoryItem['Warehouse' + item.WarehouseId] = item.OnHandQty;
                            }
                        });
                        $scope.inventoryItems.push(inventoryItem);
                    });

                    $scope.gridOptions.totalItems = result.TotalItems;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
        };

        function populateColumns() {
            $scope.gridOptions.columnDefs = [{ field: 'ProductName', displayName: 'Product', width: '**', minWidth: 250 },
                { field: 'ProductNo', displayName: 'Number', width: '*', minWidth: 150 },
                { field: 'CategoryName', displayName: 'Category', width: '*', minWidth: 150 }];

            if (!!$scope.selectedWarehouse.selected && $scope.selectedWarehouse.selected.Id > 0) {
                var warehouse = $scope.selectedWarehouse.selected;
                $scope.gridOptions.columnDefs.push({
                    field: 'Warehouse' + warehouse.Id,
                    displayName: warehouse.Name,
                    width: '*',
                    minWidth: 150,
                    cellFilter: 'number',
                    cellClass: 'number'
                });
            }
            else {
                _.each($scope.warehouses, function (warehouse) {
                    if (warehouse.Id > 0) {
                        $scope.gridOptions.columnDefs.push({
                            field: 'Warehouse' + warehouse.Id,
                            displayName: warehouse.Name,
                            width: '*',
                            minWidth: 150,
                            cellFilter: 'number',
                            cellClass: 'number'
                        });
                    }
                });
            }            

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    }); 
});