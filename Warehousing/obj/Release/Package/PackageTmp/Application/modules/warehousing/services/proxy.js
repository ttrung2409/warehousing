define([], function () {
    angular.module('warehousing').service('$proxy', function ($http, $q) {
        var host = 'http://localhost:51313/';
        function executeRequest(apiUrl, method, params, data) {
            var request = {
                url: host + apiUrl,
                method: method
            };

            if (params) {
                request.params = params;
            }

            if (data) {
                request.data = data;
            }

            var def = $q.defer();
            $http(request)
               .success(function (response) {
                   def.resolve(response);
               })
               .error(function (response) {
                   def.reject(response);
               });

            return def.promise;
        }

        this.getAllWarehouses = function () {
            var uri = 'api/warehouses';
            return executeRequest(uri, 'GET');
        }

        this.getAllCategories = function () {
            var uri = 'api/categories';
            return executeRequest(uri, 'GET');
        }

        this.createProduct = function (product) {
            var uri = 'api/products';
            return executeRequest(uri, 'POST', null, product);
        }

        this.updateProduct = function (product) {
            var uri = 'api/products';
            return executeRequest(uri, 'PUT', null, product);
        }

        this.getProducts = function (pageSize, currentPage) {
            var uri = _.str.format('api/products/?pageSize={0}&currentPage={1}', pageSize, currentPage);
            return executeRequest(uri, 'GET');
        }
        
        this.getProductByNumber = function (number) {
            var uri = _.str.format('api/products/?number={0}', number);
            return executeRequest(uri, 'GET');
        }

        this.getProductById = function (id) {
            var uri = _.str.format('api/products/{0}', id);
            return executeRequest(uri, 'GET');
        }

        this.getProductsForLookUp = function (search, limit) {
            var uri = _.str.format('api/products/?search={0}&limit={1}', search, limit);
            return executeRequest(uri, 'GET');
        }

        this.createStockReceipt = function (stockReceipt) {
            var uri = _.str.format('api/stockReceipts');
            return executeRequest(uri, 'POST', null, stockReceipt);
        }

        this.getStockReceipts = function (pageSize, currentPage) {
            var uri = _.str.format('api/stockReceipts/?pageSize={0}&currentPage={1}', pageSize, currentPage);
            return executeRequest(uri, 'GET');
        }

        this.getStockReceipt = function (id) {
            var uri = _.str.format('api/stockReceipts/{0}', id);
            return executeRequest(uri, 'GET');
        }

        this.getCycleCountById = function (id, pageSize, currentPage) {
            var uri = _.str.format('api/cycleCounts/{0}/?pageSize={1}&currentPage={2}', id, pageSize, currentPage);
            return executeRequest(uri, 'GET');
        }

        this.getCycleCounts = function (pageSize, currentPage) {
            var uri = _.str.format('api/cycleCounts/?pageSize={0}&currentPage={1}', pageSize, currentPage);
            return executeRequest(uri, 'GET');
        }

        this.createCycleCount = function (cycleCount) {
            var uri = _.str.format('api/cycleCounts');
            return executeRequest(uri, 'POST', null, cycleCount);
        }

        this.createCycleCountItem = function (item) {
            var uri = _.str.format('api/cycleCountItems');
            return executeRequest(uri, 'POST', null, item);
        }

        this.updateCycleCountItem = function (item) {
            var uri = _.str.format('api/cycleCountItems');
            return executeRequest(uri, 'PUT', null, item);
        }

        this.completeCycleCount = function(id) {
            var uri = _.str.format('api/cycleCounts/complete/{0}', id);
            return executeRequest(uri, 'PUT');
        }

        this.cancelCycleCount = function (id) {
            var uri = _.str.format('api/cycleCounts/cancel/{0}', id);
            return executeRequest(uri, 'PUT');
        }

        this.getInventoryList = function (pageSize, currentPage, productId, warehouseId) {
            var uri = _.str.format('api/inventoryList/?pageSize={0}&currentPage={1}&productId={2}&warehouseId={3}', pageSize, currentPage, productId, warehouseId);
            return executeRequest(uri, 'GET');
        }
    });
});