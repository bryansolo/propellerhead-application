(function () {
    "use strict";

    function Routes($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise("/customers");

        $stateProvider
            .state("root", {
                abstract: true,
                url: "/",
                templateUrl: "app/components/root/root.html"
            })
            .state("root.main", {
                abstract: true,
                views: {
                    page: {
                        templateUrl: "app/components/main/main.html"
                    }
                }
            })
            .state("root.main.body", {
                abstract: true,
                views: {
                    navbar: {
                        templateUrl: "app/components/navbar/navbar.html",
                        controller: "NavbarCtrl as Navbar"
                    },
                    body: {
                        template: "<div ui-view flex layout=\"column\"></div>"
                    }
                }
            })
            .state("root.main.body.customers", {
                url: "customers",
                templateUrl: "app/components/customers/customers.html",
                controller: "CustomersCtrl as Customers"
            });
    }

    angular.module("propellerhead")
        .config(Routes);

})();
