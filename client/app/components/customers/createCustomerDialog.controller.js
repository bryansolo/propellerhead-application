(function() {
    "use strict";
    
    CreateCustomerCtrl.$inject = ["$mdDialog", "Customers", "CUSTOMERS"];
    function CreateCustomerCtrl($mdDialog, Customers, CUSTOMERS) {
        
        var self = this;
        
        self.statuses = CUSTOMERS.STATUSES;
        
        self.cancel = cancel;
        self.validCustomer = validCustomer;
        self.save = save;
        self.addNote = addNote;
        self.deleteNote = deleteNote;

        function cancel(){
            $mdDialog.cancel();
        };
        
        function validCustomer(customer) {
            return customer.firstName;
        }
        
        function save(customer) {
            if (self.validCustomer(customer)) {
                Customers.save(customer).then(function(data) {
                    if (typeof data === "object") {
                        $mdDialog.hide(data); // a create will return the object
                    } else {
                        $mdDialog.hide(customer); // an update won't
                    }
                    var confirm = $mdDialog.confirm()
                                  .title("Customer saved!")
                                  .ok("Great");

                    $mdDialog.show(confirm);
                });
            }
        }
        
        function addNote() {
            self.customer.notes.push({body: ""});
        }
        
        function deleteNote(note) {
            self.customer.notes.splice(self.customer.notes.indexOf(note), 1);
        }
    }
    
    angular.module("propellerhead").controller("CreateCustomerCtrl", CreateCustomerCtrl);
    
})();