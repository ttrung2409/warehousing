define([], function () {
    angular.module('warehousing').controller('addStockReceipt', function ($scope, $proxy, $location, $common, $routeParams) {        
        $scope = _.extend($scope, {
            selectedWarehouse: {},
            items: [],
            receipt: {
                CreatedDate: new Date()
            },            
            validator: {                
                warehouse: {
                    valid: true,
                    message: '',
                    validate: validateWarehouse
                }
            },
            isEditable: !$routeParams.id,            
        });

        $scope.gridOptions = {
            allowAddNew: !$routeParams.id,            
            columns: [{
                type: 'lookup',
                field: 'SelectedProduct',
                displayMember: 'Name',
                displayName: 'Product',
                onLookUp: function (search, limit) {
                    return $proxy.getProductsForLookUp(search, limit).then(function (results) {
                        return results;
                    });
                },
                placeholder: 'Select a product',
                width: '40%',
                isEditable: $scope.isEditable
            },
           {
               type: 'number',
               field: 'Qty',
               displayName: 'Qty',
               width: '10%',
               onCellValueChanged: function (item) {
                   item.TotalCost = item.Qty * item.UnitCost;
                   calculateTotalCost();
               },
               isEditable: $scope.isEditable
           },
            {
                type: 'number',
                field: 'UnitCost',
                displayName: 'Unit Cost',
                numberOfDecimals: 2,
                width: '20%',
                onCellValueChanged: function (item) {
                    item.TotalCost = item.Qty * item.UnitCost;
                    calculateTotalCost();
                },
                isEditable: $scope.isEditable
            },
           {
               type: 'number',
               field: 'TotalCost',
               displayName: 'Total Cost',
               numberOfDecimals: 2,
           }]
        }

        if ($scope.isEditable) {
            $scope.gridOptions.columns.push({
                type: 'custom',
                cellTemplate: '<a href="javascript:void(0)" ng-click="column.removeItem(item)" tabindex="-1">Remove</a>',
                width: '10%',
                removeItem: function (item) {
                    if ($scope.items.length > 1) {
                        $scope.items = _.without($scope.items, item);
                    }

                    calculateTotalCost();
                }
            });
        }

        $proxy.getAllWarehouses().then(function (results) {
            $scope.warehouses = results;
        });

        $scope.save = function () {
            $('#form').submit();
        }

        $scope.cancel = function () {
            $location.path('/stockReceipts');
        }

        $scope.onSubmit = function () {
            $scope.items = _.filter($scope.items, function (item) {
                return !!item.SelectedProduct && !!item.Qty;
            });

            _.each($scope.items, function (item) {                
                item.ProductId = item.SelectedProduct.Id;
                item.WarehouseId = $scope.selectedWarehouse.selected.Id;                
            });

            $scope.receipt.WarehouseId = $scope.selectedWarehouse.selected.Id;
            $scope.receipt.Items = $scope.items;

            $proxy.createStockReceipt($scope.receipt).then(function () {
                $scope.receipt = {
                    CreatedDate: new Date(),                    
                };

                $scope.selectedWarehouse.selected = null;
                $scope.items = [];
            });
        }

        $scope.$watch('receipt.Freight', function() {
	        calculateTotalCost();
        });

        if (!!$routeParams.id) {
            $proxy.getStockReceipt($routeParams.id).then(function (result) {
                $scope.receipt = result;
                $scope.items = result.Items;
                $scope.selectedWarehouse.selected = result.Warehouse;

                _.each($scope.items, function (item) {
                    item.SelectedProduct = item.Product;
                });
            });
        }
        
        function calculateTotalCost() {
            var subTotal = _.reduce($scope.items, function (subTotal, item) {
                return subTotal + $common.parseFloat(item.TotalCost);
            }, 0);            

            $scope.receipt.SubTotal = subTotal;
            $scope.receipt.TotalCost = subTotal + $common.parseFloat($scope.receipt.Freight);
        }   

        function validateWarehouse() {
            if (!$scope.selectedWarehouse.selected) {
                return {
                    valid: false,
                    message: 'Warehouse is required.'
                }
            }

            return true;
        }
    }); 
});