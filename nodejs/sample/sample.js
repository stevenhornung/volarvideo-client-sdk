
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
    var upload_name = query.upload_name || "";
    var archive_name = query.archive_name || "";
    var filepath = query.file_path || "";

    try {
        params = JSON.parse(params);

        if(request_type === "broadcast_poster") {
            volar.broadcast_poster(params, filepath, upload_name, function(error, data) {
                if(error) {
                    res.write(JSON.stringify(error.message));
                    res.end();
                    return;
                }

                res.write(JSON.stringify(data));
                res.end();
            })
        }
        else if(request_type === "broadcast_archive") {
            volar.broadcast_archive(params, archive_name, function(error, data) {
                if(error) {
                    res.write(JSON.stringify(error.message));
                    res.end();
                    return;
                }

                res.write(JSON.stringify(data));
                res.end();
            })
        }
        else {
            volar[request_type](params, function(error, data) {
                if(error) {
                    res.write(JSON.stringify(error.message));
                    res.end();
                    return;
                }

                res.write(JSON.stringify(data));
                res.end();
            });
        }
    }
    catch(e) {
        res.send(400, "Invalid JSON string supplied");
    }
});

// Start server
app.listen(8888);
console.log("Server started. Listening at <http://127.0.0.1:8888>.  Press Ctl-C to stop.");
