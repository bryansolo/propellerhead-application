(function() {
    "use strict";
    
    Customers.$inject = ["$http", "API_SERVER", "$cacheFactory"];
    function Customers($http, API_SERVER, $cacheFactory) {
        
        var cacheKey = "customers";
        var cache = $cacheFactory(cacheKey);
        
        return {
            get: get,
            deleteCustomer: deleteCustomer,
            save: save
        };
        
        function clearCache() {
            if ($cacheFactory.get(cacheKey)) {
                $cacheFactory.get(cacheKey).removeAll();
            }
        }
        
        function get(params) {
            return $http({
                url: API_SERVER + "/customer",
                params: params,
                cache: cache
            }).then(function (response) {
                 return response.data;
            }, function (err) {
                 console.error(err);
            });
        }
        
        function deleteCustomer(customer) {
            return $http({
                url: API_SERVER + "/customer" + "/" + customer["_id"],
                method: "DELETE"
            }).then(function (response) {
                clearCache();
                return response.data;
            }, function (err) {
                 console.error(err);
            });
        }
        
        function save(customer) {
            return $http({
                url: API_SERVER + "/customer",
                method: "POST",
                data: customer
            }).then(function (response) {
                clearCache();
                return response.data;
            }, function (err) {
                 console.error(err);
            });
        }
    }
    
    angular.module("propellerhead").factory("Customers", Customers);
    
})();