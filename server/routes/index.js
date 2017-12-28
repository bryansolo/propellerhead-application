var router = require("express").Router();
var customer = require("./customer");

/* customer routes */
router.get("/customer", customer.get);
router.post("/customer", customer.save);
router.delete("/customer/:id", customer.delete);

module.exports = router;