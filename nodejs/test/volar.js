/*
 *
 *
 */

var http = require("http");
var https = require("https");
var fs = require("fs");

var api_key,
    secret,
    base_url,
    secure,
    error;

function Volar(client_api_key, client_secret, client_base_url) {
    api_key = client_api_key;
    secret = client_secret;
    base_url = client_base_url;
    secure = false;
    error =  "";
}

Volar.prototype.sites = function(params, callback) {
    /*
	gets list of sites

	@param object params
		- optional -
		'list' : type of list.  allowed values are 'all', 'archived',
			'scheduled' or 'upcoming', 'upcoming_or_streaming',
			'streaming' or 'live'
		'page': current page of listings.  pages begin at '1'
		'per_page' : number of broadcasts to display per page
		'section_id' : id of section you wish to limit list to
		'playlist_id' : id of playlist you wish to limit list to
		'id' : id of site - useful if you only want to get details
			of a single site
		'slug' : slug of site.  useful for searches, as this accepts
			incomplete titles and returns all matches.
		'title' : title of site.  useful for searches, as this accepts
			incomplete titles and returns all matches.
		'sort_by' : data field to use to sort.  allowed fields are date,
			status, id, title, description
		'sort_dir' : direction of sort.  allowed values are 'asc'
			(ascending) and 'desc' (descending)
	@return false on failure, object on success.  if failed, Volar.error can
		be used to get last error string
	*/

	request(route = 'api/client/info', method = 'GET', params = params, "", callback);
}

function request(route, method, params, post_body, callback) {
    var r = {};

    if(method === '') {
        method = "GET";
    }

    var params_transformed = {};
    for(var param in params) {
        if(param instanceof Array) {
            for(var v_param in params[param]) {
                params_transformed[param + "[" + encodeURIComponent(v_param) + "]"] = param[v_param];
            }
        }
        else {
            params_transformed[param] = params[param];
        }
    }

    params_transformed["api_key"] = api_key;
    var signature = build_signature(route, method, params_transformed, post_body);
    params_transformed["signature"] = signature;

    var url = "/" + route.slice(0, -1);

    try {
        if(method === "GET") {
            var get_options = options(route,method,post_body);
            var str = '';

            http.request(get_options, function(response) {
                response.on('data', function(chunk) {
                    str += chunk;
                });

                response.on('end', function() {
                    callback(str);
                });
            }).end();
        }
        else {
            var data = {};
            var files = {};

            if(typeof post_body !== "undefined") {
                if(post_body instanceof String) {
                    data = post_body;
                }
                else if(post_body instanceof Array) {
                    for(var i in post_body) {
                        if(i === "files") {
                            files = post_body[i];
                        }
                        else {
                            data[i] = post_body[i];
                        }
                    }
                }
            }
            var post_options = options(route, method, post_body);
            var post_req = http.request(post_options, function(response) {

            });

            //var stream = fs.createReadStream(files)
            post_req.write(data);
            post_req.end();

        }
    }
    catch(e) {
        error = "Request failed with the following error: " + e.message
        return false;
    }
}

function build_signature(route, method, get_params, post_body) {
    if(typeof(method) === "undefined") {
        method = "GET"
    }

    var signature = secret + method.toUpperCase() + route;

    console.log(signature);
    return signature;
}

function options(route, method, post_body) {
    return {
    host: base_url,
    port: 80,
    path: route,
    method: method};
}

module.exports = Volar;
