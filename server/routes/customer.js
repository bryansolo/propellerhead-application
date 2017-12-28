var router = require("express").Router();
var db = require("../database");
var Customer = require("../models/customer");
var url = require("url");

/* first, custom query string parser, then the get method */
router.get = [bryanQueryStringParser, get];

function get(req, res) {
    db.find(req.bryanQuery, (err, docs) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.contentType("application/json");
            res.status(200).send(docs);
        }
    });
    
    
};

/* couldn't get the query param deserializers to work the way I wanted so home-rolled one */
function bryanQueryStringParser(req, res, next) {
    var query = {};
    if (req.url) {
        var reqString = url.parse(req.url).query;
        if (reqString) {
            var requestPairs = reqString.split("&");
            for (var i = 0; i < requestPairs.length; i++) {
                var keyValue = requestPairs[i].split("=");
                if (keyValue.length === 2) {
                    var value = decodeURI(keyValue[1]);
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // not json, do nothing
                    }
                    query[keyValue[0]] = value;
                }
            }
        }
    }
    req.bryanQuery = query;    
    next();
}

router.delete = function(req, res) {
    if (!req.params.id) {
        res.status(400).send("No customer id provided");
    } else {
        db.remove({_id: req.params.id}, (err, numRemoved) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.send(numRemoved + "");
            }
        });   
    }
}

router.save = function(req, res) {
    var msg = Customer.isValid(req.body);
    if (msg !== true) {
        res.status(400).send(msg);
    } else {
        var query = {};
        /* are we updating or creating? for creation we want to perform a result-less search and upsert */
        query["_id"] = req.body["_id"] || "9999999999999999";
        
        db.update(query, req.body, {upsert: true}, function (err, numAffected, affectedDoc, upsert) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                if (upsert) { // new doc created
                    res.send(affectedDoc);
                } else { // just an update, client already has the object (plus nedb doesnt give it to us anyways)
                    res.send(numAffected + "");
                }
            }
        });
    }
}

module.exports = router;