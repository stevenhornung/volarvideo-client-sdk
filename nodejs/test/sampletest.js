var Volar = require("./volar.js");

var volar = new Volar("api_key", "secret", "uk.volarvideo.com");

volar.sites("", function(str) {
    //console.log(str);
});
