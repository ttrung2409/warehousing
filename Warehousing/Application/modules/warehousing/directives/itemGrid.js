define([], function () {
    angular.module('warehousing').directive('itemGrid', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: '=',                
                options: '='
            },
            templateUrl: '/Application/modules/warehousing/views/itemGrid.html',
            controller: function ($scope) {
                $scope.columns = $scope.options.columns;                                

                for (var i = 0; i < $scope.columns.length; i++) {
                    $scope.columns[i].index = i;
                }

                if (!!$scope.options.enablePagination) {
                    $scope.selectedPageSize = {
                        selected: $scope.options.pagination.pageSize
                    }
                }

                $scope.editCell = function ($event, item, column) {
                    if (!!column.isEditable) {
                        var cellIndex = item.index + '' + column.index;
                        if (!$scope.cells[cellIndex]) {
                            $scope.cells[cellIndex] = {};
                        }

                        $scope.cells[cellIndex].isEditable = true;

                        $timeout(function () {
                            angular.element($event.target).find('input').first().focus().select();
                        }, 100);                        
                    }

                    if (!!$scope.options.allowAddNew && $scope.items.indexOf(item) == $scope.items.length - 1) {
                        addNewItem();
                    }
                }

                $scope.onKeyDown = function ($event, item, column) {                    
                    var index = $scope.items.indexOf(item);
                    var cell = $scope.cells[item.index + '' + column.index];
                    var arrowKeys = [37, 38, 39, 40];

                    if (!cell || !cell.isPopupOpen) {
                        if (arrowKeys.indexOf($event.keyCode) >= 0) {
                            $event.preventDefault();
                        }

                        if ($event.keyCode == 37) {    // move left       
                            if (column.index == 0 && index > 0) {
                                angular.element(_.str.format('#cell{0}{1}', $scope.items[index - 1].index, $scope.columns.length - 1)).focus();
                            }
                            else if (column.index > 0) {
                                angular.element(_.str.format('#cell{0}{1}', item.index, column.index - 1)).focus();
                            }
                        }
                        else if ($event.keyCode == 39 || $event.keyCode == 13) { // move right
                            if (column.index == $scope.columns.length - 1 && index < $scope.items.length - 1) {
                                angular.element(_.str.format('#cell{0}{1}', $scope.items[index + 1].index, 0)).focus();
                            }
                            else if (column.index < $scope.columns.length - 1) {
                                angular.element(_.str.format('#cell{0}{1}', item.index, column.index + 1)).focus();
                            }
                        }
                        else if ($event.keyCode == 38) { // move up
                            if (index > 0) {
                                angular.element(_.str.format('#cell{0}{1}', $scope.items[index - 1].index, column.index)).focus();
                            }
                        }
                        else if ($event.keyCode == 40) { // move down
                            if (index < $scope.items.length - 1) {
                                angular.element(_.str.format('#cell{0}{1}', $scope.items[index + 1].index, column.index)).focus();
                            }
                        }
                    }
                }

                $scope.cancelEdit = function (item, column) {
                    $scope.cells[item.index + '' + column.index].isEditable = false;

                    if (!!column.onCellValueChanged) {
                        column.onCellValueChanged(item);
                    }
                }

                $scope.goToNextPage = function () {
                    if ($scope.options.pagination.currentPage < $scope.options.pagination.totalPages) {
                        $scope.options.pagination.currentPage++;
                    }
                }

                $scope.goToPreviousPage = function () {
                    if ($scope.options.pagination.currentPage > 1) {
                        $scope.options.pagination.currentPage--;
                    }                    
                }

                $scope.enablePageSelection = function () {
                    $scope.pageSelectionEnabled = true;
                    $timeout(function () {
                        angular.element('#pageSelection').focus().select();
                    });
                }
                
                $scope.pageSelected = function () {
                    if ($scope.options.pagination.selectedPage > 0 && $scope.options.pagination.selectedPage <= $scope.options.pagination.totalPages) {
                        $scope.options.pagination.currentPage = $scope.options.pagination.selectedPage;
                    }                    
                    $scope.pageSelectionEnabled = false;
                }

                $scope.$watch('items', function () {
                    $scope.cells = {};
                    $scope.lastRowIndex = $scope.items.length - 1;
                    for (var i = 0; i < $scope.items.length; i++) {
                        $scope.items[i].index = i;
                    }

                    if ($scope.items.length == 0) {
                        addNewItem();
                    }
                });

                if (!!$scope.options.enablePagination) {
                    $scope.$watch('selectedPageSize.selected', function (value) {
                        $scope.options.pagination.pageSize = value;
                    });

                    $scope.$watch('options.pagination.totalItems + options.pagination.pageSize', function () {                        
                        $scope.options.pagination.currentPage = 1;
                        $scope.options.pagination.totalPages = Math.ceil($scope.options.pagination.totalItems / ($scope.options.pagination.pageSize * 1.0));
                        $scope.options.pagination.pages = [];
                        for (var i = 1; i <= $scope.options.pagination.totalPages; i++) {
                            $scope.options.pagination.pages.push(i);
                        }
                    });
                }                

                function addNewItem() {
                    $scope.lastRowIndex++;
                    $scope.items.push({
                        index: $scope.lastRowIndex
                    });
                }
            }         
        };
    }).directive('itemGridCell', function ($compile) {        
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                element.html(attrs.template);
                $compile(element.contents())(scope);
            }
        };
    });
});