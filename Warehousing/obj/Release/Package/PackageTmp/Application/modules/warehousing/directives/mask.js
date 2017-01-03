define([], function () {
    angular.module('warehousing').directive('mask', function ($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                if (attrs.mask == 'number') {
                    var numberOfDecimals = 0;
                    if (!!attrs.numberOfDecimals) {
                        numberOfDecimals = parseFloat(attrs.numberOfDecimals);
                    }

                    ctrl.$formatters.unshift(function () {
                        return $filter(attrs.mask)(ctrl.$modelValue, numberOfDecimals);
                    });

                    ctrl.$parsers.unshift(function (viewValue) {
                        if (!!viewValue) {
                            var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                            if (_.str.count(viewValue, '.') == 1) {
                                var actualNumberOfDecimals = viewValue.substring(viewValue.indexOf('.') + 1).length;
                                if (actualNumberOfDecimals > 0) {
                                    if (actualNumberOfDecimals <= numberOfDecimals) {
                                        element.val($filter(attrs.mask)(plainNumber, actualNumberOfDecimals));
                                    }
                                    else {
                                        element.val($filter(attrs.mask)(plainNumber, numberOfDecimals));
                                    }
                                }
                            }
                            else {
                                element.val($filter(attrs.mask)(plainNumber));
                            }

                            return plainNumber;
                        }                                                
                        
                    });

                    element.addClass('number');
                }                
            }
        };
    });
});