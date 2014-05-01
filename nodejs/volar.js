/*
    SDK for interfacing with the Volar cms.  Allows pulling of lists as well
	as manipulation of records.  Requires an api user to be set up.  All
	requests (with the exception of the Volar.sites call) requires the 'site'
	parameter, and 'site' must match the slug value of a site that the given
	api user has access to.  Programmers can use the Volar.sites call to get
	this information.
	depends on the requests module:
		https://github.com/mikeal/request
 */

var req = require("request");
var querystring = require("querystring");
var crypto = require("crypto");
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

	request(route = 'api/client/info', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.broadcasts = function(params, callback) {
    /*
	gets list of broadcasts

	@param dict params
		- required -
		'site' OR 'sites'	slug of site to filter to.
			if passing 'sites', users can include a comma-delimited list of
			sites.  results will reflect all broadcasts in the listed
			sites.
		- optional -
		'list' : type of list.  allowed values are 'all', 'archived',
			'scheduled' or 'upcoming', 'upcoming_or_streaming',
			'streaming' or 'live'
		'page' : current page of listings.  pages begin at '1'
		'per_page' : number of broadcasts to display per page
		'section_id' : id of section you wish to limit list to
		'playlist_id' : id of playlist you wish to limit list to
		'id' : id of broadcast - useful if you only want to get details
			of a single broadcast
		'title' : title of broadcast.  useful for searches, as this
			accepts incomplete titles and returns all matches.
		'template_data' : dict.  search broadcast template data.  should
			be in the form:
				{
					'field title' : 'field value',
					'field title' : 'field value',
					....
				}
		'autoplay' : true or false.  defaults to false.  used in embed
			code to prevent player from immediately playing
		'embed_width' : width (in pixels) that embed should be.  defaults
			to 640
		'sort_by' : data field to use to sort.  allowed fields are date,
			status, id, title, description
		'sort_dir' : direction of sort.  allowed values are 'asc'
			(ascending) and 'desc' (descending)
	@return false on failure, dict on success.  if failed, Volar.error can
		be used to get last error string
	*/

	if(!params['site'] && !params['sites']) {
        error = "'site' or 'sites' parameter is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/broadcast', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.broadcast_create = function(params, callback) {
    /*
	create a new broadcast

	@param dict params
		- required -
		'title' : title of the new broadcast
		'contact_name' : contact name of person we should contact if we detect problems with this broadcast
		'contact_phone' : phone we should use to contact contact_name person
		'contact_sms' : sms number we should use to send text messages to contact_name person
		'contact_email' : email address we should use to send emails to contact_name person
			* note that contact_phone can be omitted if contact_sms is supplied, and vice-versa
		- optional -
		'description' : HTML formatted description of the broadcast.
		'status' : currently only supports 'scheduled' & 'upcoming'
		'timezone' : timezone of given date.  only timezones listed
			on http://php.net/manual/en/timezones.php are supported.
			defaults to UTC
		'date' : date (string) of broadcast event.  will be converted
			to UTC if the given timezone is given.  note that if the
			system cannot read the date, or if it isn't supplied, it
			will default it to the current date & time.
		'section_id' : id of the section that this broadcast should
			be assigned.  the Volar.sections() call can give you a
			list of available sections.  Defaults to a 'General' section
	@return dict
	{
		'success' : True or False depending on success
		...
		if 'success' == True:
			'broadcast' : dict containing broadcast information,
				including id of new broadcast
		else:
			'errors' : list of errors to give reason(s) for failure
	}
	*/

	var site = params['site'];
    delete params['site'];

	if(site === undefined) {
		error = "site is required";
		callback(new Error(error));
        return;
    }

	request(route = 'api/client/broadcast/create', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.broadcast_update = function(params, callback) {
    /*
    update existing broadcast

		@param dict params
			- required -
			'id' : id of broadcast you wish to update
			- optional -
			'title' : title of the new broadcast.  if supplied, CANNOT be
				blank
			'description' : HTML formatted description of the broadcast.
			'status' : currently only supports 'scheduled' & 'upcoming'
			'timezone' : timezone of given date.  only timezones listed
				on http://php.net/manual/en/timezones.php are supported.
				defaults to UTC
			'date' : date (string) of broadcast event.  will be converted
				to UTC if the given timezone is given.  note that if the
				system cannot read the date, or if it isn't supplied, it
				will default it to the current date & time.
			'section_id' : id of the section that this broadcast should
				be assigned.  the Volar.sections() call can give you a
				list of available sections.  Defaults to a 'General' section
			'contact_name' : contact name of person we should contact if we detect problems with this broadcast
			'contact_phone' : phone we should use to contact contact_name person
			'contact_sms' : sms number we should use to send text messages to contact_name person
			'contact_email' : email address we should use to send emails to contact_name person
				* note that contact_phone can be omitted if contact_sms is supplied, and vice-versa
		@return dict
			{
				'success' : True or False depending on success
				if 'success' == True:
					'broadcast' : dict containing broadcast information,
						including id of new broadcast
				else:
					'errors' : list of errors to give reason(s) for failure
			}
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
		error = "site is required";
		callback(new Error(error));
        return;
    }

	request(route = 'api/client/broadcast/update', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.broadcast_delete = function(params, callback) {
    /*
    delete a broadcast

    the only parameter (aside from 'site') that this function takes is 'id'
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        return false;
    }

    request(route = 'api/client/broadcast/delete', method = 'POST', req_params = { 'site' : site }, post_body = params, callback)
}

Volar.prototype.broadcast_assign_playlist = function(params, callback) {
    /*
    assign a broadcast to a playlist

		@params dict params
			'id' : id of broadcast
			'playlist_id' : id of playlist
		@return dict { 'success' : True }
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/broadcast/assignplaylist', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.broadcast_remove_playlist = function(params, callback) {
	/*
	remove a broadcast from a playlist

	@params dict params
		'id' : id of broadcast
		'playlist_id' : id of playlist
	@return dict { 'success' : True }
	*/

    var site = params['site'];
    delete params['site'];

	if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

	request(route = 'api/client/broadcast/removeplaylist', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.broadcast_poster = function(params, file_path, callback) {
	/*
	uploads an image file as the poster for a broadcast.

	@params
		dict params
			'id' : id of broadcast
		string file_path
			if supplied, this file is uploaded to the server and attached
			to the broadcast as an image
		string filename
			if supplied & file_path is also given, the uploaded file's
			name is reported to Volar as this filename.  used for easing
			file upload passthrus.  if not supplied, the filename from
			file_path is used.
	@return dict
		{
			'success' : True or False depending on success
			if 'success' == False:
				'errors' : list of errors to give reason(s) for failure
		}
	*/

    if(!params['site']) {
        error = "'site' parameter is required";
        callback(new Error(error));
        return;
    }

	if(file_path === '') {
		request(route = 'api/client/broadcast/poster', method = 'GET', req_params = params, null, callback);
    }
	else {
        var post = {"files": {"api_poster": fs.createReadStream(__dirname + file_path)}};
        request(route = 'api/client/broadcast/poster', method = 'POST', req_params = params, post_body = post, callback);
    }
}

Volar.prototype.broadcast_archive = function(params, file_path, callback) {
	/*
	archives a broadcast.

	@params
		dict params
			'id' : id of broadcast
			'site' : slug of site that broadcast is attached to.
		string file_path
			if supplied, this file is uploaded to the server and attached
			to the broadcast
	@return dict
		{
			'success' : True or False depending on success
			'broadcast' : dict describing broadcast that was modified.
			if 'success' == True:
				'fileinfo' : dict containing information about the
				uploaded file (if there was a file uploaded)
			else:
				'errors' : list of errors to give reason(s) for failure
		}
	*/

	if(file_path === '') {
		request(route = 'api/client/broadcast/archive', method = 'GET', req_params = params, null, callback);
    }
	else {
		var post = {"files": {'archive': fs.createReadStream(__dirname + file_path)}};
		request(route = 'api/client/broadcast/archive', method = 'POST', req_params = params, post_body = post, callback);
    }
}

Volar.prototype.templates = function(params, callback) {
    /*
    gets list of meta-data templates

		@param dict params
			- required -
			'site' : slug of site to filter to.  note that 'sites' is not supported
			- optional -
			'page' : current page of listings.  pages begin at '1'
			'per_page' : number of broadcasts to display per page
			'broadcast_id' : id of broadcast you wish to limit list to.
			'section_id' : id of section you wish to limit list to.
			'id' : id of template - useful if you only want to get details
				of a single template
			'title' : title of template.  useful for searches, as this accepts
				incomplete titles and returns all matches.
			'sort_by' : data field to use to sort.  allowed fields are id, title,
				description, date_modified. defaults to title
			'sort_dir' : direction of sort.  allowed values are 'asc' (ascending) and
				'desc' (descending). defaults to asc
		@return false on failure, dict on success.  if failed, Volar.error can
			be used to get last error string

    */

    if(!params['site']) {
        error = "'site' parameter is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/template', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.template_create = function(params, callback) {
    /*
    create a new meta-data template

		@param dict params
			- required -
			'site' : slug of site to filter to.  note that 'sites' is not supported
			'title' : title of the broadcast
			'data' : list of data fields (dictionaries) assigned to template.
				should be in format:
					[
						{
							"title" : (string) "field title",
							"type" : (string) "type of field",
							"options" : {...} or [...]	//only include if type supports
						},
						...
					]
				supported types are:
					'single-line' - single line of text
					'multi-line' - multiple-lines of text, option 'rows' (not
						required) is number of lines html should display as.
						ex: "options": {'rows': 4}
					'checkbox' - togglable field.  value will be the title of
						the field.  no options.
					'checkbox-list' - list of togglable fields.  values should
						be included in 'options' list.
						ex: "options" : ["option 1", "option 2", ...]
					'radio' - list of selectable fields, although only 1 can be
						selected at at time.  values should be included in
						'options' list.
						ex: "options" : ["option 1", "option 2", ...]
					'dropdown' - same as radio, but displayed as a dropdown.
						values should be included in 'options' array.
						ex: "options" : ["option 1", "option 2", ...]
					'country' - dropdown containing country names.  if you wish
						to specify default value, include "default_select".  this
						should not be passed as an option, but as a seperate value
						attached to the field, and accepts 2-character country
						abbreviation.
					'state' - dropdown containing united states state names.  if
						you wish to specify default value, include "default_select".
						this should not be passed as an option, but as a seperate
						value attached to the field, and accepts 2-character state
						abbreviation.
			- optional -
			'description' : text used to describe the template.
			'section_id' : id of section to assign broadcast to. will default to 'General'.
		@return dict
			{
				'success' : True or False depending on success
				...
				if 'success' == True:
					'template' : dict containing template information,
						including id of new template
				else:
					'errors' : list of errors to give reason(s) for failure
			}
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/template/create', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.template_update = function(params, callback) {
    /*
    create a new meta-data template

		@param dict params
			- required -
			'site' : slug of site to filter to.  note that 'sites' is not supported
			'id' : numeric id of template that you are intending to update.
			- optional -
			'title' : title of the broadcast
			'data' : list of data fields assigned to template.  see template_create() for format
			'description' : text used to describe the template.
			'section_id' : id of section to assign broadcast to. will default to 'General'.
		@return dict
			{
				'success' : True or False depending on success
				...
				if 'success' == True:
					'template' : dict containing template information,
						including id of new template
				else:
					'errors' : list of errors to give reason(s) for failure
			}
			Note that if you do not have direct access to update a template (it may be domain or
				client level), a new template will be created and returned to you that does have
				the permissions set for you to modify.  keep this in mind when updating templates.
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/template/update', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.template_delete = function(params, callback) {
    /*
    delete a meta-data template

	the only parameter (aside from 'site') that this function takes is 'id'
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/template/delete', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.sections = function(params, callback) {
    /*
    gets list of sections

		@param dict params
			- required -
			'site' OR 'sites'	slug of site to filter to.
				if passing 'sites', users can include a comma-delimited list of
				sites.  results will reflect all sections in the listed sites.
			- optional -
			'page' : current page of listings.  pages begin at '1'
			'per_page' : number of broadcasts to display per page
			'broadcast_id' : id of broadcast you wish to limit list to.
				will always return 1
			'video_id' : id of video you wish to limit list to.  will always
				return 1.  note this is not fully supported yet.
			'id' : id of section - useful if you only want to get details of
				a single section
			'title' : title of section.  useful for searches, as this accepts
				incomplete titles and returns all matches.
			'sort_by' : data field to use to sort.  allowed fields are id,
				title
			'sort_dir' : direction of sort.  allowed values are 'asc'
				(ascending) and 'desc' (descending)
		@return false on failure, dict on success.  if failed, Volar.error can
			be used to get last error string
    */

    if(!params['site'] && !params['sites']) {
        error = "'site' or 'sites' parameter is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/section', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.playlists = function(params, callback) {
    /*
    gets list of playlists

		@param dict params
			- required -
			'site' OR 'sites'	slug of site to filter to.
				if passing 'sites', users can include a comma-delimited list of
				sites.  results will reflect all playlists in the listed
				sites.
			- optional -
			'page' : current page of listings.  pages begin at '1'
			'per_page' : number of broadcasts to display per page
			'broadcast_id' : id of broadcast you wish to limit list to.
			'video_id' : id of video you wish to limit list to.  note this is
				not fully supported yet.
			'section_id' : id of section you wish to limit list to
			'id' : id of playlist - useful if you only want to get details of
				a single playlist
			'title' : title of playlist.  useful for searches, as this accepts
				incomplete titles and returns all matches.
			'sort_by' : data field to use to sort.  allowed fields are id,
				title
			'sort_dir' : direction of sort.  allowed values are 'asc'
				(ascending) and 'desc' (descending)
		@return false on failure, dict on success.  if failed, Volar.error can
			be used to get last error string
    */

    if(!params['site'] && !params['sites']) {
        error = "'site' or 'sites' parameter is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/playlist', method = 'GET', req_params = params, null, callback);
}

Volar.prototype.playlist_create = function(params, callback) {
    /*
    create a new playlist

		@param dict params
			- required -
			'title' : title of the new playlist
			- optional -
			'description' : HTML formatted description of the playlist.
			'available' : flag whether or not the playlist is available
				for public viewing.  accepts 'yes','available','active',
				& '1' (to flag availability) and 'no','unavailable',
				'inactive', & '0' (to flag non-availability)
			'section_id' : id of the section that this playlist should
				be assigned.  the Volar.sections() call can give you a
				list of available sections.  Defaults to a 'General' section
		@return dict
			{
				'success' : True or False depending on success
				...
				if 'success' == True:
					'playlist' : dict containing playlist information,
						including id of new playlist
				else:
					'errors' : list of errors to give reason(s) for failure
			}
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/playlist/create', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.playlist_update = function(params, callback) {
    /*
    update existing playlist

		@param dict params
			- required -
			'id' : id of playlist you wish to update
			- optional -
			'title' : title of the new playlist.  if supplied, CANNOT be
				blank
			'description' : HTML formatted description of the playlist.
			'available' : flag whether or not the playlist is available
				for public viewing.  accepts 'yes','available','active',
				& '1' (to flag availability) and 'no','unavailable',
				'inactive', & '0' (to flag non-availability)
			'section_id' : id of the section that this playlist should
				be assigned.  the Volar.sections() call can give you a
				list of available sections.  Defaults to a 'General' section
		@return dict
			{
				'success' : True or False depending on success
				if 'success' == True:
					'playlist' : dict containing playlist information,
						including id of new playlist
				else:
					'errors' : list of errors to give reason(s) for failure
			}
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/playlist/update', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}

Volar.prototype.playlist_delete = function(params, callback) {
    /*
    delete a playlist

	the only parameter (aside from 'site') that this function takes is 'id'
    */

    var site = params['site'];
    delete params['site'];

    if(site === undefined) {
        error = "site is required";
        callback(new Error(error));
        return;
    }

    request(route = 'api/client/playlist/delete', method = 'POST', req_params = { 'site' : site }, post_body = params, callback);
}



function request(route, method, req_params, post_body, callback) {
    /*
    make request to client cms api

    @param string route - required
        path of api call after hostname
    @param string method - required
        HTTP method of request
    @param object params - optional
        dictionary of parameter objects
    @param string post_body - optional
        body of the post request
    @param object callback - required
        function to call after async request completes
    @return object
        {
            'success' : true or false depending on success
            if 'success' === True:
                dict of returned data
            else:
                'error' : list of errors to give reason(s) for failure
        }
    */

    // Build dictionary of parameter objects
    req_params = sortObject(req_params);
    var params_transformed = {};
    for(var param in req_params) {
        if(param instanceof Array) {
            var ind_param = sortObject(req_params[param]);
            for(var v_param in ind_param) {
                params_transformed[param + "[" + encodeURIComponent(v_param) + "]"] = param[v_param];
            }
        }
        else {
            params_transformed[param] = req_params[param];
        }
    }

    params_transformed["api_key"] = api_key;
    var signature = build_signature(route, method, params_transformed, JSON.stringify(post_body));
    params_transformed["signature"] = signature;
    params_transformed = querystring.stringify(params_transformed);

    try {
        if(method === 'GET') {
            var options = get_options(route, params_transformed, method, post_body);

            // Make GET request with options
            req(options, function(error, response, body) {
                if(body.success || body.success === undefined) {
                    callback(null, body);
                }
                else {
                    error = JSON.stringify(body);
                    callback(new Error(error));
                }
            });
        }
        else {
            var data = {};
            var files = {};

            // Add data to request
            if(post_body) {
                if(post_body instanceof String) {
                    data = post_body;
                }
                else if(post_body instanceof Object) {
                    for(var i in post_body) {
                        // Check if file needs to be sent as multipart
                        if(i === "files") {
                            files = post_body[i];
                        }
                        else {
                            data[i] = post_body[i];
                        }
                    }
                }
            }

            var options = get_options(route, params_transformed, method, data);

            // Make POST request with options
            // Check that no files to pipe
            if(Object.keys(files).length === 0) {
                req(options, function(error, response, body) {
                    if(body.success || body.success === undefined) {
                        callback(null, body);
                    }
                    else {
                        error = JSON.stringify(body);
                        callback(new Error(error));
                    }
                });
            }
            // Else files need to be piped to request
            else {
                var file = files['api_poster'] || files['archive'];
                file.pipe(req(options, function(error, response, body) {
                    if(body.success || body.success === undefined) {
                        callback(null, body);
                    }
                    else {
                        error = JSON.stringify(body);
                        callback(new Error(error));
                    }
                }));
            }
        }
    }
    catch(e) {
        error = "Request failed with the following error: " + e.message
        callback(new Error(error));
        return;
    }
}

function build_signature(route, method, params, post_body) {
    var signature = secret + method.toUpperCase() + route;

    params = sortObject(params);
    for(var param in params) {
        var ind_param = sortObject(params[param]);
        if(param instanceof Array) {
            for(var i = 0; i < ind_param.length; ++i) {
                signature += param + '[' + i + ']=' + ind_param[i];
            }
        }
        else if(param instanceof Object) {
            for(var ind_param_key in ind_param) {
                signature += param + '[' + ind_param_key + ']=' + ind_param[ind_param_key];
            }
        }
        else {
            signature += param + '=' + params[param];
        }
    }

    if(typeof post_body === "string") {
        signature += post_body;
    }

    signature = crypto.createHash("sha256").update(signature).digest("base64");
    signature = signature.substring(0, 43);
    signature = signature.trimRight("=");

    return signature;
}

function get_options(route, params, method, data) {
    var protocol;

    if(secure) {
        protocol = "https://";
    }
    else {
        protocol = "http://";
    }

    var options = {
            uri: protocol + base_url.trimRight("/") + "/" + route + "?" + params,
            method: method,
            json: data
    };

    return options;
}

function sortObject(obj) {
    var sorted = {};
    var key, a = [];

    for(key in obj) {
        if(obj.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for(key = 0; key < a.length; ++key) {
        sorted[a[key]] = obj[a[key]];
    }

    return sorted;
}

String.prototype.trimRight = function(charlist) {
    if(charlist === undefined) {
        charlist = "\s";
    }

    return this.replace(new RegExp("[" + charlist + "]+$"), "");
}

module.exports = Volar;
