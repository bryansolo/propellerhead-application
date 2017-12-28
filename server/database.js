var Datastore = require("nedb");
var path = require("path");

module.exports = new Datastore({
    filename: path.join(__dirname, "db.json"),
    autoload: true,
    timestampData: true,
    onLoad: onLoad
});

function onLoad(err) {
    console.error("There was an error loading the database:", err);
}