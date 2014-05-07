using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Security.Cryptography;
using System.Web;
using System.Net;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using System.IO;



class Volar
{
    public string api_key = null;
    public string secret = null;
    public string baseurl = null;
    public bool secure = false;
    public string debug = null;

    private string error = null;

    public Volar(string api_key = "", string secret = "", string base_url = "vcloud.volarvideo.com")
    {
        this.api_key = api_key;
        this.secret = secret;
        this.baseurl = base_url;
    }
    public string getError()
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
    public object sites(SortedDictionary<string, string> parameter_array)
    {
        return this.request("api/client/info", "GET", parameter_array, "");
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
    public object broadcasts(SortedDictionary<string, string> parameter_array)
    {
        return this.request("api/client/broadcast", "GET", parameter_array, "");
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
    public object broadcast_create(SortedDictionary<string, string> parameter_array)
    {
        string json = "";

        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject(parameter_array);
        }
       // Console.Write("this is the post body passed with broadcast create: \n");
      //  Console.Write(json+"\n");
        return this.request("api/client/broadcast/create", "POST", parameter_array, json);
    }

    public object broadcast_update(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if ((parameter_array.Count) > 0)
        {
            json = JsonConvert.SerializeObject(parameter_array);
        }
        Console.Write(json);
        return this.request("api/client/broadcast/update", "POST", parameter_array, json);
    }
    public object broadcast_delete(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if ((parameter_array.Count) > 0)
        {
            json = JsonConvert.SerializeObject(parameter_array);
        }
        return this.request("api/client/broadcast/delete", "POST", parameter_array, json);
    }
    public object broadcast_remove_playlist(SortedDictionary<string, string> parameter_array)
    {
        return this.request("api/client/broadcast/removeplaylist", "GET", parameter_array, "");
    }
    public object broadcast_poster(SortedDictionary<string, string> parameter_array = null, string image_path = "", string image_name = "")
    {
        if (parameter_array["id"] != null)
        {
            this.error = "id is required";
            return false;
        }
        string holder = image_path;
        holder = holder.Replace("@", "");
        holder = "@" + holder;

        SortedDictionary<string, string> post = new SortedDictionary<string, string>();
        post.Add("api_poster", holder);
        if (holder != null)
        {
            image_name = image_name.Replace("''", "");
            image_name = image_name.Replace(";", "");
            post["api_poster"] = ";filename=" + image_name;
        }
        return this.request("api/client/broadcast/poster", "POST", parameter_array, post["api_poster"]);
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

    public object broadcast_archive(SortedDictionary<string, string> parameter_array, string file_path = "")
    {
        if (parameter_array["id"] == null)
        {
            this.error = "id is required";
            return null;
        }
        if ((file_path == ""))
        {
            return this.request("api/client/broadcast/archive", "GET", parameter_array,file_path);
        }
        else
        {
            string holder = file_path;
            holder = holder.Replace("@", "");
            holder = "@" + holder;
            return this.request("api/client/broadcast/archive", "POST", parameter_array, holder);
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
    public object templates(SortedDictionary<string, string> parameter_array)
    {
        if (parameter_array["site"] == null)
        {
            this.error = "'site' parameter is required";
            return null;
        }
        return this.request("api/client/template", "GET", parameter_array,"");
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
    public object template_create(SortedDictionary<string, string> parameter_array = null)
    {
        string json = "";
        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject(parameter_array);
        }
        return this.request("api/client/template/create", "POST", parameter_array, json);
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
    public object template_update(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if ((parameter_array.Count) > 0)
        {
            json = JsonConvert.SerializeObject(parameter_array);
        }
        return this.request("api/client/template/update", "POST", parameter_array, json);
    }

    /**
     *	delete an existing broadcast meta-data template.  note that this does not affect template data attached to broadcasts, only the template.
     *	@param mixed parameter_array associative array or json string
     *		recognized parameters:
     *			- required -
     *				'site'				slug of site to assign broadcast to. note that if the api user does not have permission to create broadcasts on the given site, an error will be produced.
     *				'id'				id of broadcast that you're updating
     */
    public object template_delete(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject(new List<KeyValuePair<string, string>>(parameter_array));
        }
        return this.request("api/client/template/delete", "POST", parameter_array, json);
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
    public object sections(SortedDictionary<string, string> parameter_array)
    {
        if ((parameter_array["site"] == null) && (parameter_array["sites"] == null))
        {
            this.error = "'site' or 'sites' parameter is required";
            return null;
        }
        return this.request("api/client/section", "GET", parameter_array, "");
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
    public object playlists(SortedDictionary<string, string> parameter_array)
    {
        return this.request("api/client/playlist", "GET", parameter_array, "");
    }
    public object playlist_create(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject((parameter_array));
        }
        return this.request("api/client/playlist/create", "POST", parameter_array, json);
    }
    public object playlist_update(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject((parameter_array));
        }
        return this.request("api/client/playlist/create", "POST", parameter_array, json);
    }

    public object playlist_delete(SortedDictionary<string, string> parameter_array)
    {
        string json = "";
        if (parameter_array.Count > 0)
        {
            json = JsonConvert.SerializeObject((parameter_array));
        }
        return this.request("api/client/playlist/create", "POST", parameter_array, json);
    }

    public object timezones(SortedDictionary<string, string> parameter_array)
    {
        return this.request("api/client/info/timezones", "GET", parameter_array, "");
    }

    /**
     *	submits request to base_url through route
     *	route		api uri path (not including base_url!)
     *	type		type of request.  only GET and POST are supported.  if blank, GET is assumed
     *	parameter_array		associative array containing the GET parameters for the request
     *	post_body	either a string or an array for post requests.  only used if type is POST.  if left null, an error will be returned
     * false on failure, array on success.  if failed, volar.getError() can be used to get last error string
     */
    public object request(string route, string type, SortedDictionary<string, string> parameter_array, string post_body)
    {
        type = type.ToUpper();
        parameter_array["api_key"] = this.api_key;
        string signature = this.buildSignature(route, type, parameter_array, post_body);
        string url = (this.secure ? "https://" : "http://") + this.baseurl + "/";
        string query_string = "";
        foreach (KeyValuePair<string, string> kvp in parameter_array)
        {
            query_string += ((query_string != "") ? "&" : "?") + kvp.Key + "=" + WebUtility.UrlEncode(kvp.Value);
        }
        query_string = query_string + "&signature=" + signature;	//signature doesn't need to be urlencoded, as the buildSignature function does it for you.
       // Console.Write("\nthis is the querystring: " + query_string + "\n");
     //   Console.Write("this is the post body: \n"+post_body+"\n");
      //  Console.Write("here is what the URL looks like: \n"+url + route + query_string+"\n");
        string response = this.execute(url + route + query_string, type, post_body, "application/x-www-form-urlencoded");
        if (response == null)
        {
            //error string should have already been set
            return null;
        }
        //SortedDictionary<string,string> json = new SortedDictionary<string,string>();
        this.debug = url + route + query_string + "\n" + response;
        dynamic json = JsonConvert.DeserializeObject(response);
        if (json["error"] != null)
        {
            this.error = "(" + json["error"] + ")";
            return null;
        }
        return json;
    }
    public string buildSignature(string route, string type, SortedDictionary<string, string> get_params, string post_body)
    {
        //signature here is dependant on the url endpoint.  here, the programmer was
        //  trying to delete a broadcast.  Ideally, you would want to iterate through the
        //  sorted params list, append them to the endpoint as per the documentation,
        //  and use that to generate the signature.
        var signature = secret;
      //  Console.Write("\n secret= " + signature + "\n");
        signature = signature + type;
      //  Console.Write("\n secret + type = " + signature + "\n");
           signature= signature+ route;
      //     Console.Write("\n secret +type + route= " + signature + "\n");
        //Console.Write("build signaturee post body: \n"+post_body+"\n");
        foreach (KeyValuePair<string, string> kvp in get_params)
        {
            signature = signature + kvp.Key + "=" + kvp.Value;
        }
       // Console.Write("\n signature with keys and values= " + signature + "\n");
        signature = signature + post_body;
     //   Console.Write("\nsig +post= " + signature + "\n");
        var test = sha256(signature); //hash the string using sha256
        signature = EncodeTo64(test); //base64 encode the result
        signature = signature.Remove(43); //trim to the first 43 chars
        signature = signature.TrimEnd(new[] { '=' }); //remove trailing '=' chars
        signature = WebUtility.UrlEncode(signature);
      //  Console.Write("\n URL encode sig= " + signature + "\n");
        return signature;
    }

    public string execute(string url, string type, string post_body, string content_type)
    {
        //byte[] byteArray = stringToByteArray(post_body);
        var data = Encoding.ASCII.GetBytes(post_body);
       // Console.Write("This is the execute post_body: \n" + post_body + "\n");
        WebRequest request = WebRequest.Create(url);
        request.ContentType = content_type;
        request.Method = type;
        Stream dataStream = null;
        if (post_body.Length>5)
        {
            request.Method = "POST";
        }
        // begin write to POST body
        if (request.Method == "POST")
        {
            dataStream = request.GetRequestStream();
            dataStream.Write(data, 0, data.Length);
            dataStream.Close();
        }
        // end write to POST body

        // get the response
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();

        Stream receiveStream = response.GetResponseStream();
        StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);

        string responseToReturn = readStream.ReadToEnd();

        response.Close();
        readStream.Close();
        return responseToReturn;

    }

    // taken from http://stackoverflow.com/questions/472906/converting-a-string-to-byte-array
    static public byte[] stringToByteArray(string str)
    {
        byte[] bytes = new byte[str.Length * sizeof(char)];
        System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
        return bytes;
    }

    //hashes the string
    static public byte[] sha256(string password)
    {
        var crypt = new SHA256Managed();
        string hash = String.Empty;
        byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(password), 0, Encoding.UTF8.GetByteCount(password));

        return crypto;
    }

    //encodes to base 64
    static public string EncodeTo64(byte[] toEncode)
    {
        return Convert.ToBase64String(toEncode);
    }
}
