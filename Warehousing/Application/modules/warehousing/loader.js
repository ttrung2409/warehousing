define(['modules/warehousing/services/proxy',
    'modules/warehousing/services/common',
    'modules/warehousing/services/dialog',
    'modules/warehousing/controllers/products',
    'modules/warehousing/controllers/addProduct',
    'modules/warehousing/controllers/stockReceipts',
    'modules/warehousing/controllers/addStockReceipt',
    'modules/warehousing/controllers/cycleCounts',
    'modules/warehousing/controllers/addCycleCount',
    'modules/warehousing/controllers/editCycleCount',
    'modules/warehousing/controllers/dialog',
    'modules/warehousing/controllers/inventoryList',
    'modules/warehousing/controllers/menu',
    'modules/warehousing/directives/mask',
    'modules/warehousing/directives/itemGrid',
    'modules/warehousing/directives/validate',
    'modules/warehousing/constants',
    'modules/warehousing/animation'    
], function () {
    angular.module('warehousing').config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Application/modules/warehousing/views/products.html',
            controller: 'products'
        }).when('/receiving', {
            templateUrl: 'Application/modules/warehousing/views/addStockReceipt.html',
            controller: 'addStockReceipt'
        }).when('/stockReceipts', {
            templateUrl: 'Application/modules/warehousing/views/stockReceipts.html',
            controller: 'stockReceipts'
        }).when('/receiving/:id', { 
            templateUrl: 'Application/modules/warehousing/views/addStockReceipt.html',
            controller: 'addStockReceipt'
        }).when('/cycleCounts', {
            templateUrl: 'Application/modules/warehousing/views/cycleCounts.html',
            controller: 'cycleCounts'
        }).when('/editCycleCount/:id', {
            templateUrl: 'Application/modules/warehousing/views/editCycleCount.html',
            controller: 'editCycleCount'
        }).when('/inventoryList', {
            templateUrl: 'Application/modules/warehousing/views/inventoryList.html',
            controller: 'inventoryList'
        });
    });    
});