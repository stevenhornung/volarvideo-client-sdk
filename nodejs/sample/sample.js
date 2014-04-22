
var Volar = require('../volar.js');
var fs = require("fs");
var express = require("express");
var url = require("url");
var config = require('../spec/test-config.json');

// Get test credentials from file
var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;

// Create volar instance
var volar = new Volar(api_key, secret, base_url);

// Set up our web application
var app = express();

// Listen for requests at '/' and send form data
app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

// Listen for requests made to query Volar Video client CMS
app.get('/request', function(req, res) {
    var query = url.parse(req.url, true).query;

    var request_type = query.request_type;
    var params = query.params || '{}';

    try {
        volar[request_type](params, function(error, data) {
            if(error) {
                res.send(error.message);
                return;
            }

            res.send(data);
        })
    }
    catch(e) {
        res.send(400, "Invalid JSON string supplied");
    }
});

// Start server
app.listen(8888);
console.log("Server started. Listening at 127.0.0.1:8888");
