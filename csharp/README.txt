C# SDK for Volar's client sdk

C# SDK requires the request module which can be installed by loading the class file into the ASP.net framework of a webstie
and make calls to the functions by instantiating a Volar object.

Add class file to website and the include the namespace of volar.

Then, you can instantiate the object:

Volar v = new Volar(api_key, api_secret, base_url);
And then you can execute requests based on the documentation for each function (in the code). You must pass requests to the functions
in the form of a SortedDictionary, this automatically places all the keys in alphabetical order, which fits volar videos
requirements for request data.

Instantiate an instance of the SortedDictionary as such:

SortedDiction<string,string> array = new SortedDictionary<string,string>();

and then add the requred parameters:

array.Add("site","volar");

To list all upcoming broadcasts (for instance), you can do:

v.broadcasts(array);

if the requested data doesn't fit the correct format the v.error attribute will be filled with the response string from request
to let the user know why the request wasn't successful.


A full test suite assures the connections and response were successful for each of the function calls in volar.cs
