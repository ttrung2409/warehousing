define([], function () {
    angular.module('warehousing').controller('stockReceipts', function ($scope, $proxy, $location) {
        $scope.totalItems = 0;        

        $scope.gridOptions = {
            data: 'stockReceipts',
            enableColumnResize: true,                   
            totalItems: 'totalItems',            
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            paginationCurrentPage: 1,
            enableHorizontalScrollbar: 0,
            useExternalPagination: true,
            columnDefs: [
                { field: 'Id', displayName: 'Number', width: '10%' },
                { field: 'CreatedDate', displayName: 'Created Date', width: '20%', cellFilter: 'date: "dd/MM/yyyy"'},
                { field: 'Warehouse.Name', displayName: 'Warehouse', width: '15%' },                
                { field: 'TotalCost', displayName: 'Total Cost', width: '15%', cellFilter: 'number: 2', cellClass: 'number'},
                { field: 'Id', displayName: '', cellTemplate:
                 '<div class="grid-action-cell">' +
                 '<a ng-click="$event.stopPropagation(); grid.appScope.viewReceipt(row.entity.Id);">View</a>' +
                 '</div>'
                }
            ]
        };

        $scope.addNewReceipt = function () {
            $location.path('/receiving');
        }

        $scope.viewReceipt = function (id) {
            $location.path('/receiving/' + id);
        }
       
        getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);

        $scope.$watch('gridOptions.paginationPageSize + gridOptions.paginationCurrentPage', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);
            }
        }, true);

        function getPagedData(pageSize, currentPage) {
            $proxy.getStockReceipts(pageSize, currentPage).then(function (result) {
                $scope.stockReceipts = result.Data;
                $scope.gridOptions.totalItems = result.TotalItems;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };
    });
});