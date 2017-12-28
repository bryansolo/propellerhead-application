var express = require("express");
var Database = require("./database");
var router = require("./routes");
var url = require("url");
var bodyParser = require("body-parser");

var app = express();

/* helps with http POST */
app.use(bodyParser.json());

/* serve the client code */
app.use(express.static("client"));

app.use(router);

app.listen(3000, function () {
  console.log("Application listening on port 3000");
});