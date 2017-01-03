define([], function () {
    angular.module('warehousing').controller('products', function ($scope, $proxy, $uibModal, $rootScope) {
        $scope.totalItems = 0;            

        $scope.gridOptions = {
            data: 'products',
            enableColumnResize: true,                   
            totalItems: 'totalItems',            
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            paginationCurrentPage: 1,
            enableHorizontalScrollbar: 0,
            useExternalPagination: true,
            columnDefs: [
                { field: 'Number', displayName: 'Number', width: '25%' },
                { field: 'Name', displayName: 'Name', width: '35%' },
                { field: 'Category.Name', displayName: 'Category', width: '15%' },
                { field: 'UnitPrice', displayName: 'Unit Price', width: '15%', cellFilter: 'number: 2', cellClass: 'number'},
                { field: 'Number', displayName: '', width: '10%', cellTemplate:
                 '<div class="grid-action-cell">' +
                 '<a ng-click="$event.stopPropagation(); grid.appScope.editProduct(row.entity.Id);">Edit</a>' +
                 '</div>'
                }
            ]
        };

        $scope.addNewProduct = function () {
            var modalInstance = $uibModal.open({                
                templateUrl: window.baseUrl + 'Application/modules/warehousing/views/addProduct.html',
                controller: 'addProduct',
                size: 'med',                
                resolve: {
                    productId: function () {
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function (product) {
                $proxy.createProduct(product).then(function () {
                    getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);
                });
            });
        };

        $scope.editProduct = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: window.baseUrl + 'Application/modules/warehousing/views/addProduct.html',
                controller: 'addProduct',
                size: 'med',
                resolve: {
                    productId: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (product) {
                $proxy.updateProduct(product).then(function () {
                    getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);
                });
            });
        }       
       
        $scope.$watch('gridOptions.paginationPageSize + gridOptions.paginationCurrentPage', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);
            }
        }, true);

        getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);        

        function getPagedData(pageSize, currentPage) {
            $proxy.getProducts(pageSize, currentPage).then(function (result) {
                $scope.products = result.Data;
                $scope.gridOptions.totalItems = result.TotalItems;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };
    });
});