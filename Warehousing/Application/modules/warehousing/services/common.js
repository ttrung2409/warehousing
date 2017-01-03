define([], function () {
    angular.module('warehousing').service('$common', function () {
        this.parseFloat = function (number) {
            if (isNaN(parseFloat(number))) {
                return 0;
            }

            return parseFloat(number);
        };
    });
});