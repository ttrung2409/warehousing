define([], function () {
    angular.module('warehousing').controller('cycleCounts', function ($scope, $proxy, $uibModal, $location, $dialog, constants) {
        $scope.totalItems = 0;        

        $scope.gridOptions = {
            data: 'cycleCounts',
            enableColumnResize: true,                   
            totalItems: 'totalItems',            
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            paginationCurrentPage: 1,
            enableHorizontalScrollbar: 2,
            useExternalPagination: true,
            columnDefs: [
                { field: 'Id', displayName: 'Number', width: '*', minWidth: 150 },
                { field: 'CreatedDate', displayName: 'CreatedDate', width: '*', minWidth: 150, cellFilter: 'date: "dd/MM/yyyy"' },
                { field: 'Warehouse.Name', displayName: 'Warehouse', width: '*', minWidth: 150 },
                { field: 'Status', displayName: 'Status', width: '*', minWidth: 100 },
                { field: 'TotalItems', displayName: 'Total Items', width: '*', minWidth: 150, cellFilter: 'number', cellClass: 'number'},
                { field: 'TotalItemsCounted', displayName: 'Total Items Counted', width: '*', minWidth: 180, cellFilter: 'number', cellClass: 'number' },
                { field: 'TotalVariant', displayName: 'Total Variant', width: '*', minWidth: 150, cellFilter: 'number', cellClass: 'number' },
                { field: 'Number', displayName: '', width: '*', minWidth: 150, cellTemplate:
                 '<div ng-if="row.entity.Status==\'Open\'" class="grid-action-cell">' +
                 '<a ng-click="$event.stopPropagation(); grid.appScope.editCycleCount(row.entity.Id);">Edit</a>&nbsp&nbsp' +
                 '<a ng-click="$event.stopPropagation(); grid.appScope.cancelCycleCount(row.entity);">Cancel</a>' +
                 '</div>'
                }
            ]
        };

        $scope.addNewCycleCount = function () {
            var modalInstance = $uibModal.open({                
                templateUrl: window.baseUrl + 'Application/modules/warehousing/views/addCycleCount.html',
                controller: 'addCycleCount',
                size: 'med'
            });

            modalInstance.result.then(function (cycleCount) {
                $proxy.createCycleCount(cycleCount).then(function (id) {
                    $location.path('/editCycleCount/' + id);
                });
            });
        };

        $scope.editCycleCount = function (id) {
            $location.path('/editCycleCount/' + id);            
        }

        $scope.cancelCycleCount = function (cycleCount) {
            $dialog.showConfirmationDialog({
                title: 'Cancel Cycle Count',
                message: 'Do you want to cancel this cycle count?'
            }).then(function (result) {
                if (result == constants.DialogResult.Yes) {
                    $proxy.cancelCycleCount(cycleCount.Id).then(function () {
                        cycleCount.Status = constants.CycleCountStatus.Cancelled;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    });
                }
            });
        }
       
        getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);

        $scope.$watch('gridOptions.paginationPageSize + gridOptions.paginationCurrentPage', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                getPagedData($scope.gridOptions.paginationPageSize, $scope.gridOptions.paginationCurrentPage);
            }
        }, true);

        function getPagedData(pageSize, currentPage) {
            $proxy.getCycleCounts(pageSize, currentPage).then(function (result) {
                $scope.cycleCounts = result.Data;                
                $scope.gridOptions.totalItems = result.TotalItems;                
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        };
    });
});