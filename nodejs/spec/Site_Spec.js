var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Sites", function() {
    var volar = new Volar(api_key, secret, base_url);

    it("can fetch sites", function() {
        var flag, data, error;

        runs(function() {
            var params = {};
            volar.sites(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.sites).toBeDefined();
        });
    });
});
