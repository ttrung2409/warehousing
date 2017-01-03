define([], function () {
    angular.module('warehousing').constant('constants', {
        CycleCountStatus: {
            Open: 'Open',
            Complete: 'Complete',
            Cancelled: 'Cancelled'
        },

        DialogResult: {
            Yes: 'Yes',
            No: 'No'
        }
    });
});