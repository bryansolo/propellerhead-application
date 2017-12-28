(function() {
    "use strict";
    
    CustomersCtrl.$inject = ["Customers", "$mdDialog", "CUSTOMERS"];
    function CustomersCtrl(Customers, $mdDialog, CUSTOMERS) {
        
        var self = this;
        
        self.statuses = CUSTOMERS.STATUSES;
        self.headers = headers();
        self.sorter = null;
        self.reverseSort = false;
        
        self.deletePerson = deletePerson;
        self.create = create;
        self.toggleSort = toggleSort;
        
        Customers.get().then(function(results) {
                self.results = results;
        });
        
        function deletePerson(customer) {
            var confirm = $mdDialog.confirm()
                              .title("Are you sure you wish to delete the records of " + customer.firstName + " " + customer.lastName + "?")
                              .ok("Yes")
                              .cancel("Cancel");
                $mdDialog.show(confirm).then(function() {
                    Customers.deleteCustomer(customer).then(function() {
                        self.results.splice(self.results.indexOf(customer), 1);
                    });
                });
        }
        
        function create(customer) {
            var locals = {};
            
            if (customer) {
                locals.customer = angular.copy(customer);
            } else {
                locals.customer = {notes: []};
            }
            
            $mdDialog.show(
                {
                    templateUrl: "app/components/customers/createCustomerDialog.html",
                    locals: locals,
                    bindToController: true,
                    controller: "CreateCustomerCtrl",
                    controllerAs: "Create",
                    clickOutsideToClose: false
                }
            ).then(function(newCust) {
                var update = false;
                self.results.forEach(function(cust, idx) {
                    if (cust["_id"] === newCust["_id"]) {
                        update = true;
                        self.results.splice(idx, 1, newCust);
                    }
                });
                if (!update) {
                    self.results.push(newCust);
                }
            });
        }
        
        function toggleSort(header) {
            self.reverseSort = (self.sorter === header.attribute) ? !self.reverseSort : false;
            self.sorter = header.attribute;
        }
        
        function headers() {
            return [
                {
                    name: "Name",
                    flex: "20",
                    attribute: "firstName"
                },
                {
                    name: "Date Added",
                    flex: "15",
                    attribute: "createdAt"
                },
                {
                    name: "Status",
                    flex: "15",
                    attribute: "status"
                },
                {
                    name: "Phone",
                    flex: "15",
                    attribute: "phone"
                },
                {
                    name: "Email",
                    flex: "20",
                    attribute: "email"
                }
            ];
        }
    }
    
    angular.module("propellerhead").controller("CustomersCtrl", CustomersCtrl);
    
})();