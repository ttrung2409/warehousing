define([], function () {
    angular.module('warehousing').animation('.view-transition', function () {
        return {
            enter: function (element, done) {
                element.hide();
                element.fadeIn('slow');
            }
        }
    });
});