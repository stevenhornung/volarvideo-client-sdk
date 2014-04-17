var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Broadcasts", function() {
    var volar = new Volar(api_key, secret, base_url);

    it("called without site parameter fails", function() {
        var flag, data, error;

        runs(function() {
            volar.broadcasts({}, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "Data and error to be set", 1000);

        runs(function() {
            expect(error).not.toBeNull();
        });
    });

    it("called with invalid site parameter fails", function() {
        var flag, data, error;

        runs(function() {
            volar.broadcasts({site: 'blah blah'}, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "Data and error to be set", 1000);

        runs(function() {
            expect(error).not.toBeNull();
        });
    });

    it("called with valid site parameter to succeed", function() {
        var flag, data, error;

        runs(function() {
            volar.broadcasts({site: 'volar'}, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "Data and error to be set", 1000);

        runs(function() {
            expect(error).toBeNull();
        });
    });
});
