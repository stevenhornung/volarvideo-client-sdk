var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Connection", function() {
    var volar = new Volar(api_key, secret, base_url);

    it("should succeed with valid credentials", function() {
        var flag, data, error;

        runs(function() {
            var params = {};
            volar.sites(params, function(rt_error, rt_data) {
                error = rt_data;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "Data/error to be set", 5000);

        runs(function() {
            //expect(data).not.toBeNull();
        });
    });

    it("should fail with invalid api_key", function() {
        var volar = new Volar('a', secret, base_url);
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
        }, "Data/error to be set", 5000);

        runs(function() {
            //expect(error).not.toBeNull();
        });
    });

    it("should fail with invalid secret", function() {
        var volar = new Volar(api_key, 'a', base_url);
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
        }, "Data/error to be set", 5000);

        runs(function() {
            //expect(error).not.toBeNull();
        });
    });
});
