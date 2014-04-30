var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Template", function() {
    var volar = new Volar(api_key, secret, base_url);
    var template;

    it("can fetch templates", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests"};
            volar.templates(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data).toBeDefined();
            expect(error).toBeNull();
        });
    });

    it("can create a template", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "title": "Node.js_SDK_Template", "data": [{"title": "Temp title", "type": "single-line"}]};
            volar.template_create(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(true);
            expect(data.template).toBeDefined();
            template = data.template;
        });
    });

    it("can update a template title", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": template.id, "title": "Node.js_Template_Update"};
            volar.template_update(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(true);
        });
    });

    it("can update a template description", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": template.id, "description": "Node.js description update."};
            volar.template_update(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(true);
        });
    });

    it("can delete a template", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": template.id};
            volar.template_delete(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(true);
        });
    });
});
