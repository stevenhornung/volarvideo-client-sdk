class Volar
{
	public string apikey = null;
	public string secret = null;
	public string baseurl = null;
	public bool secure = false;
	public string debug = null;
	
	private string error = null;
	
	public Volar(api_key = '', secret = '', base_url = 'vcloud.volarvideo.com')
	{
		this.apikey = api_key;
		this.secret = secret;
		this.baseurl = base_url;
	}
		public getError()
	{
		return this.error;
	}
		/**
	 *	gets list of sites
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'id'				id of site - useful if you only want to get details of a single site
	 *				'slug'				slug of site.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'title'				title of site.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are status, id, title, description. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
		public sites(string[] parameter_array)
	{
		return this.request('api/client/info', 'GET', parameter_array);
	}
		/**
	 *	gets list of broadcasts
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site'				slug of site to filter to.
	 *				- optional -
	 *				'list'				type of list.  allowed values are 'all', 'archived', 'scheduled' or 'upcoming', 'upcoming_or_streaming', 'streaming' or 'live'
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'section_id'		id of section you wish to limit list to
	 *				'playlist_id'		id of playlist you wish to limit list to
	 *				'id'				id of broadcast - useful if you only want to get details of a single broadcast
	 *				'title'				title of broadcast.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'autoplay'			true or false.  defaults to false.  used in embed code to prevent player from immediately playing
	 *				'embed_width'		width (in pixels) that embed should be.  defaults to 640
	 *				'before' 			return broadcasts that occur before specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *				'after' 			return broadcasts that occur after specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *										note - if both before and after are included, broadcasts between the supplied dates are returned.
	 *				'sort_by'			data field to use to sort.  allowed fields are date, status, id, title, description. defaults to date
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to desc
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	 	public broadcasts(string[] paramater_array)
	{
		return this.request('api/client/broadcast', 'GET', parameter_array);
	}
	/**
	 *	creates a new broadcast
	 *	@param mixed paramater associative array or json string
	 *		recognized parameters:
	 *			- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all broadcasts in the listed sites.
	 *				'title'				title of the broadcast
	 *				'contact_name'		contact name of person we should contact if we detect problems with this broadcast
	 *				'contact_phone'		phone we should use to contact contact_name person
	 *				'contact_sms'		sms number we should use to send text messages to contact_name person
	 *				'contact_email'		email address we should use to send emails to contact_name person
	 *					* note that contact_phone can be omitted if contact_sms is supplied, and vice-versa
	 *			- optional -
	 *				'date'				date of broadcast. Will default to current time.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *				'timezone'			allows you to specify what timezone this date refers to. will default to the UTC timezone. For a list of accepted timezones, see the Supported Timezones api call.
	 *				'description'		html formatted text for the description of the broadcast. matches.
	 *				'section_id'		id of section to assign broadcast to. will default to 'General'.
	 */
	public broadcast_create(string[] paramater_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/broadcast/create', 'POST', array(), paramater);
	}
	
	public broadcast_update(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/broadcast/update', 'POST', array(), parameter_array);
	}
		public broadcast_delete(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
		//	parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/broadcast/delete', 'POST', array(), parameter_array);
	}
	public broadcast_remove_playlist(parameter_array = array())
	{
		return this.request('api/client/broadcast/removeplaylist', 'GET', parameter_array);
	}
		public broadcast_poster(parameter_array = array(), image_path = '', image_name = '')
	{
		if(!isset(parameter_array['id']))
		{
			this.error = 'id is required';
			return false;
		}
		//string post = array('api_poster' => '@'.ltrim(image_path,'@'));
		if(image_name)
		{
		//	image_name = str_replace(array(';','"'), '', image_name);
		//	post['api_poster'] += ';filename='+image_name;
		}
		return this.request('api/client/broadcast/poster', 'POST', parameter_array, post);
	}
	
		/**
	 *	archives a broadcast
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site'				slug of site to filter to.
	 *				'id'				id of broadcast
	 *	@param string file_path (optional) path to file you wish to upload.
	 *				Only necessary if you wish to upload a new video file to an existing broadcast.
	 *				If your broadcast was streamed via a different method (RTMP or production truck) & you wish to
	 *				archive the existing video data, omit this argument.
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	 
	 public broadcast_archive(parameter_array = array(), string file_path = '')
	{
		if(!isset(parameter_array['id']))
		{
			this.error = 'id is required';
			return false;
		}
		if(empty(file_path))
		{
			return this.request('api/client/broadcast/archive', 'GET', parameter_array);
		}
		else
		{
		//	string post = array('archive' => '@'.ltrim(file_path,'@'));
			return this.request('api/client/broadcast/archive', 'POST', parameter_array, post);
		}
	}
	/**
	 *	gets list of meta-data templates
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site'
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'broadcast_id'		id of broadcast you wish to limit list to.
	 *				'section_id'		id of section you wish to limit list to.
	 *				'id'				id of template - useful if you only want to get details of a single template
	 *				'title'				title of template.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are id, title, description, date_modified. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	 public templates(parameter_array = array())
	{
		if(!isset(parameter_array['site']))
		{
			this.error = '"site" parameter is required';
			return false;
		}
		return this.request('api/client/template', 'GET', parameter_array);
	}
		/**
	 *	creates a new meta-data template
	 *	@param mixed parameter_array associative array or json string
	 *		recognized parameters:
	 *			- required -
	 *				'site'
	 *				'title'				title of the broadcast
	 *				'data'				array of data fields assigned to template.  should be in format:
	 *										array(
	 *											array(
	 *												"title" : (string) "field title",
	 *												"type" : (string) "type of field",
	 *												"options" : array(...)	//only include if type supports
	 *											),
	 *											...
	 *										)
	 *									supported types are:
	 * 										'single-line' - single line of text
	 *										'multi-line' - multiple-lines of text, option 'rows' (not required) is number of lines html should display as.  ex: "options": array('rows' => 4)
	 *										'checkbox' - togglable field.  value will be the title of the field.  no options.
	 *										'checkbox-list' - list of togglable fields.  values should be included in 'options' array.  ex: "options" : array("option 1", "option 2", ...)
	 *										'radio' - list of selectable fields, although only 1 can be selected at at time.  values should be included in 'options' array.  ex: "options" : array("option 1", "option 2", ...)
	 *										'dropdown' - same as radio, but displayed as a dropdown.  values should be included in 'options' array.  ex: "options" : array("option 1", "option 2", ...)
	 *										'country' - dropdown containing country names.  if you wish to specify default value, include "default_select".  this should not be passed as an option, but as a seperate value attached to the field, and accepts 2-character country abbreviation.
	 *										'state' - dropdown containing united states state names.  if you wish to specify default value, include "default_select".  this should not be passed as an option, but as a seperate value attached to the field, and accepts 2-character state abbreviation.
	 *			- optional -
	 *				'description'		text used to describe the template.
	 *				'section_id'		id of section to assign broadcast to. will default to 'General'.
	 */
	 public template_create(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/template/create', 'POST', array(), parameter_array);
	}
	/**
	 *	update an existing broadcast meta-data template
	 *	@param mixed parameter_array associative array or json string
	 *		recognized parameters:
	 *			- required -
	 *				'site'				slug of site to assign broadcast to. note that if the api user does not have permission to create broadcasts on the given site, an error will be produced.
	 *				'id'				id of broadcast that you're updating
	 *			- optional -
	 *				'title'				title of the broadcast
	 *				'data'				array of data fields assigned to template.  see template_create() for format
	 *				'description'		text for the description of the template.
	 *				'section_id'		id of section to assign broadcast to.
	 */
	public template_update(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/template/update', 'POST', array(), parameter_array);
	}
	
	/**
	 *	delete an existing broadcast meta-data template.  note that this does not affect template data attached to broadcasts, only the template.
	 *	@param mixed parameter_array associative array or json string
	 *		recognized parameters:
	 *			- required -
	 *				'site'				slug of site to assign broadcast to. note that if the api user does not have permission to create broadcasts on the given site, an error will be produced.
	 *				'id'				id of broadcast that you're updating
	 */
	public template_delete(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/template/delete', 'POST', array(), parameter_array);
	}
	/**
	 *	gets list of sections
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all sections in the listed sites.
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'broadcast_id'		id of broadcast you wish to limit list to.  will always return 1
	 *				'video_id'			id of video you wish to limit list to.  will always return 1.  note this is not fully supported yet.
	 *				'id'				id of section - useful if you only want to get details of a single section
	 *				'title'				title of section.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are id, title. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	public sections(parameter_array = array())
	{
		if(!isset(parameter_array['site']) && !isset(parameter_array['sites']))
		{
			this.error = '"site" or "sites" parameter is required';
			return false;
		}
		return this.request('api/client/section', 'GET', parameter_array);
	}
	
	/**
	 *	gets list of playlists
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all playlists in the listed sites.
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'broadcast_id'		id of broadcast you wish to limit list to.
	 *				'video_id'			id of video you wish to limit list to.  note this is not fully supported yet.
	 *				'section_id'		id of section you wish to limit list to
	 *				'id'				id of playlist - useful if you only want to get details of a single playlist
	 *				'title'				title of playlist.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are id, title. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	public playlists(parameter_array = array())
	{
		return this.request('api/client/playlist', 'GET', parameter_array);
	}
	public playlist_create(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
		//	parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/playlist/create', 'POST', array(), parameter_array);
	}
	public playlist_update(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/playlist/update', 'POST', array(), parameter_array);
	}

	public playlist_delete(string[] parameter_array = '')
	{
		if(is_array(parameter_array) && count(parameter_array) > 0)
		{
			//parameter_array = json_encode(parameter_array);
		}
		return this.request('api/client/playlist/delete', 'POST', array(), parameter_array);
	}

	public timezones(parameter_array = array())
	{
		return this.request('api/client/info/timezones', 'GET', parameter_array);
	}
	/**
	 *	gets list of videos
	 *	@param array parameter_array associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site'				slug of site to filter to.
	 *				- optional -
	 *				'available'			filter based on whether the video is active or inactive.  allowed values are: 'yes', 'active', or 'available' (to get active videos - this is default behavior), 'no', 'inactive', or 'unavailable' (to get all inactive videos), and finally 'all' (to not filter on whether or not the video is set active or inactive)
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of videos to display per page
	 *				'section_id'		id of section you wish to limit list to
	 *				'playlist_id'		id of playlist you wish to limit list to
	 *				'id'				id of broadcast - useful if you only want to get details of a single broadcast
	 *				'title'				title of broadcast.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'autoplay'			true or false.  defaults to false.  used in embed code to prevent player from immediately playing
	 *				'embed_width'		width (in pixels) that embed should be.  defaults to 640
	 *				'sort_by'			data field to use to sort.  allowed fields are status, id, title, description, and playlist (only when playlist_id is supplied)
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending)
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	public videos(parameter_array = array())
	{
		if(!isset(parameter_array['site']))
		{
			this.error = 'site is required';
			return false;
		}
		return this.request('api/client/video', 'GET', parameter_array);
	}
	/**
	 *	submits request to base_url through route
	 *	@param string 	route		api uri path (not including base_url!)
	 *	@param string 	type		type of request.  only GET and POST are supported.  if blank, GET is assumed
	 *	@param array 	parameter_array		associative array containing the GET parameters for the request
	 *	@param mixed 	post_body	either a string or an array for post requests.  only used if type is POST.  if left null, an error will be returned
	 *	@return false on failure, array on success.  if failed, volar.getError() can be used to get last error string
	 */
	public request(string route, string type = '', parameter_array = array(), string post_body = null)
	{
		type = strtoupper(type ? type : 'GET');
		parameter_array['api_key'] = this.api_key;
		signature = this.buildSignature(route, type, parameter_array, post_body);

		//string url = (this.secure ? 'https://' : 'http://').this.base_url.'/'.trim(route, '/');
		string query_string = '';
		foreach(parameter_array as key => int value)
		{
			if(is_array(value))
			{
				foreach(value as v_key => int v_value)
				{
					//query_string += (query_string ? '&' : '?') + key +'['+urlencode(v_key)+']='+ urlencode(v_value);
				}
			}
			else
				//query_string += (query_string ? '&' : '?') +key +'='+ urlencode(value);
		}
		query_string += '&signature='+signature;	//signature doesn't need to be urlencoded, as the buildSignature function does it for you.

		if(!response = this.execute(url+query_string, type, post_body))
		{
			//error string should have already been set
			return false;
		}
		//this.debug = url+query_string+"\n"+response;
		//json = json_decode(response, true);
		if(isset(json['error']) && !empty(json['error']))
		{
			this.error = '('+json['error']['code']+') '+json['error']['message'];
			return false;
		}
		return json;
	}
	public buildSignature(string route, string type = '', get_params = array(), post_body = '')
	{
		//type = strtoupper(type ? type : 'GET');
		//ksort(get_params);
		//stringToSign = this.secret.type.trim(route, '/');

		foreach(get_params as key => value)	//note that get_params are NOT urlencoded
		{
			if(is_array(value))
			{
				ksort(value);
				foreach(value as v_key => v_value)
				{
					stringToSign += key+'['+v_key+']='+v_value;
				}
			}
			else
			{
				stringToSign += key+'='+value;
			}
		}

		if(!is_array(post_body))
			stringToSign += post_body;

	//	string signature = base64_encode(hash('sha256', stringToSign, true));
	//	string signature = urlencode(substr(signature, 0, 43));
	//	string signature = rtrim(signature, '=');

		return signature;
	}

	public execute(string url, string type, string post_body, string content_type = '', curl_options = array())
	{
		//type = strtoupper(type);
		//ch = curl_init(url);
		//curl_setopt(ch, CURLOPT_RETURNTRANSFER, true);	//need the cURL request to come back with response so sdk code can handle it.
		//curl_setopt(ch, CURLOPT_CUSTOMREQUEST, type);	//set request type
		if(content_type)
		{
			//curl_setopt(ch, CURLOPT_HTTPHEADER, content_type);
		}
		if(!empty(post_body) && type == 'POST')
		{
			//curl_setopt(ch, CURLOPT_POSTFIELDS, post_body);
		}
		elseif(type == 'POST')	//post_body is empty
		{
			this.error = 'If type is POST, post_body is expected to be populated as an array or as a non-empty string';
			return false;
		}

		if(count(curl_options) > 0)
		{
			//curl_setopt_array(ch, curl_options);
		}

		//response = curl_exec(ch);
		if(!response)
		{
			//error = curl_error(ch);
			//curl_close(ch);
			this.error = "cURL error: (url) "+error;
			return false;
		}

		//curl_close(ch);

        return response;
	}
}
