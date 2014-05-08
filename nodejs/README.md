cms-client-sdk-nodejs
=====================
Node.js SDK for Volar's client sdk

The Node.js SDK requires the request module which can be installed via npm:
```
npm install request
```

To use the Node.js SDK, require it:
```
var Volar = require('./volar.js');
```
Then, you can instantiate the object:
```
var volar = new Volar(api_key, api_secret, base_url);
```
And then you can execute requests based on the documentation for each function (in the code).
To list all upcoming broadcasts (for instance), you can do:
```
volar.broadcasts({"site": "<site slug>", "list", "scheduled"}, function(error, data) {
    if(error) {
        // handle error
        return;
    }

    // otherwise use data
    console.log(data);
});
```
where 'function(error, data){...}' is a callback function for the asynchronous request.
