define([], function () {
    angular.module('warehousing').controller('addProduct', function ($scope, $proxy, $uibModalInstance, $timeout, $q, productId) {
        $scope = _.extend($scope, {
            selectedCategory: {},
            validator: {
                number: {
                    valid: true,
                    message: '',
                    validate: validateNumber
                },
                name: {
                    valid: true,
                    message: '',
                    validate: validateName
                },
                category: {
                    valid: true,
                    message: '',
                    validate: validateCategory
                },
            },
            product: {}
        });

        if (!!productId) {
            $proxy.getProductById(productId).then(function (result) {
                $scope.product = result;
                $scope.selectedCategory.selected = result.Category;
            });
        }

        $proxy.getAllCategories().then(function (results) {
            $scope.categories = results;
        });

        $scope.ok = function () {
            angular.element('#form').submit();            
        };

        $scope.onSubmit = function () {
            $scope.product.CategoryId = !!$scope.selectedCategory.selected ? $scope.selectedCategory.selected.Id : null;
            $scope.product.Category = null;
            $uibModalInstance.close($scope.product);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };      

        function validateNumber() {
            if (!!$scope.product.Id) {
                return true;
            }

            if (!$scope.product.Number) {
                return {
                    valid: false,
                    message: 'Number is required'
                }
            }

            return $proxy.getProductByNumber($scope.product.Number).then(function (result) {
                if (!!result)
                    return {
                        valid: false,
                        message: 'Number already exists.'
                    }

                return true;
            });            
        }

        function validateName() {            
            if (!$scope.product.Name) {
                return {
                    valid: false,
                    message: 'Name is required.'
                }
            }

            return true;
        }

        function validateCategory() {
            if (!$scope.selectedCategory.selected) {
                return {
                    valid: false,
                    message: 'Category is required.'
                }
            }

            return true;
        }
    });
});