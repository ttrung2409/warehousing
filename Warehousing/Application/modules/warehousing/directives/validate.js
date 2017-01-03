define([], function () {
    angular.module('warehousing').directive('formValidate', function ($q, $timeout) {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {
                $scope.validators = [];

                this.addValidator = function (validator) {
                    $scope.validators.push(validator);
                }

                if (!!$attrs.formSubmit) {
                    $scope.$watch($attrs.formSubmit, function (submitFunc) {
                        $scope.submitFunc = submitFunc;
                    });
                }
            },
            link: function (scope, element, attrs) {
                element.on('submit', function ($event) {
                    $event.preventDefault();

                    var promises = [];
                    _.each(scope.validators, function (validator) {
                        promises.push($q.when(scope.$eval(validator.validate)));
                    });

                    var valid = true;
                    $q.all(promises).then(function (results) {
                        _.each(results, function (result, index) {
                            if (angular.isObject(result)) {
                                scope.validators[index].valid = result.valid;
                                scope.validators[index].message = result.message;

                                valid = valid & result.valid;
                            }
                            else {
                                scope.validators[index].valid = result;
                                scope.validators[index].message = '';

                                valid = valid & result;
                            }
                        });

                        if (!!valid) {
                            if (!!scope.submitFunc) {
                                scope.$eval(scope.submitFunc);
                            }
                        }
                        else {
                            $timeout(function () {
                                var errorElement = element.find('.error').first();
                                if (errorElement.hasClass('ui-select-match')) {
                                    errorElement.parent().find('.ui-select-focusser').focus();
                                }
                                else {
                                    errorElement.focus();
                                }
                            }, 100);
                        }
                    });
                });
            }
        }
    }).directive('validate', function ($compile, $q) {
        return {
            restrict: 'A',
            require: '^formValidate',
            link: function (scope, element, attrs, formValidationCtrl) {
                element.removeAttr('validate');
                element.attr('uib-tooltip', '{{' + attrs.validate + '.message}}');
                element.attr('tooltip-trigger', 'focus');
                element.attr('ng-class', "{'error': !" + attrs.validate + ".valid}");

                element.on('blur', function () {
                    var validator = getValidator(attrs.validate);
                    if (!!validator) {
                        $q.when(scope.$eval(validator.validate)).then(function (result) {
                            if (angular.isObject(result)) {
                                validator.valid = result.valid;
                                validator.message = result.message;
                            }
                            else {
                                validator.valid = result;
                                validator.message = '';
                            }
                        });
                    }
                });

                scope.$watch(attrs.validate, function (validator) {
                    if (!!validator) {
                        formValidationCtrl.addValidator(validator);
                    }
                });

                $compile(element)(scope);

                function getValidator(name) {
                    var validator = scope;
                    var segs = name.split('.');
                    for (var i = 0; i < segs.length; i++) {
                        validator = validator[segs[i]];
                    }

                    return validator;
                }
            }
        };
    }).directive('selectValidate', function ($compile) {
        return {
            restrict: 'A',            
            link: function (scope, element, attrs) {
                element.removeAttr('select-validate');
                element.find('.ui-select-focusser').attr('validate', attrs.selectValidate);
                element.find('.ui-select-match').attr('ng-class', "{'error': !" + attrs.selectValidate + ".valid}");
                $compile(element.find('.ui-select-focusser'))(scope);
                $compile(element.find('.ui-select-match'))(scope);
            }
        };
    });;
});