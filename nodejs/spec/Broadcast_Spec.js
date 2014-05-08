var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Broadcasts", function() {
    var volar = new Volar(api_key, secret, base_url);
    var broadcast;

    it("can fetch broadcasts with valid site", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests"};
            volar.broadcasts(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.broadcasts).toBeDefined();
        });
    });

    it("fails to fetch broadcasts with invalid site", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "bad_site"};
            volar.broadcasts(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.broadcasts).not.toBeDefined();
            expect(data.success).toBe(false);
        });
    });

    it("fails to fetch broadcasts with no site", function() {
        var flag, data, error;

        runs(function() {
            var params = {};
            volar.broadcasts(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(error).toBeDefined();
            expect(data).not.toBeDefined();
        });
    });

    it("can create a broadcast", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": 'sdk-tests',"title": "Node.js_SDK_Test", "contact_name": "Node.js", "contact_phone": "555-555-5555", "contact_sms": "555-456-7890", "contact_email": "yoda@starwars.com"};
            volar.broadcast_create(params, function(rt_error, rt_data) {
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
            expect(data.broadcast.id).toBeDefined();
            broadcast = data.broadcast;
        });
    });

    it("fail to create a broadcast with missing params", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": 'sdk-tests',"title": "Node.js_SDK_Test"};
            volar.broadcast_create(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(false);
            expect(data.error || data.errors).toBeDefined();
        });
    });

    it("can update a broadcast title", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id, "title": "Title_Update"};
            volar.broadcast_update(params, function(rt_error, rt_data) {
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

    it("can update a broadcast description", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id, "description": "Node.js broadcast update"};
            volar.broadcast_update(params, function(rt_error, rt_data) {
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

    it("can update a broadcast section", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id, "section_id": "2"};
            volar.broadcast_update(params, function(rt_error, rt_data) {
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

    it("fail to update a broadcast with missing params", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "title": "Title_Update"};
            volar.broadcast_update(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(false);
            expect(data.error || data.errors).toBeDefined();
        });
    });

    xit("can add a poster to a broadcast", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id};
            var file_path = "/spec/nodejs-logo.jpeg";
            var file_name = "node js logo";
            volar.broadcast_poster(params, file_path, function(rt_error, rt_data) {
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

    xit("can archive a broadcast", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id};
            var file_path = "test.mp4";
            volar.broadcast_archive(params, file_path, function(rt_error, rt_data) {
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

    it("can delete a broadcast", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id};
            volar.broadcast_delete(params, function(rt_error, rt_data) {
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

    it("fails to delete a broadcast with missing params", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests"};
            volar.broadcast_delete(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data.success).toBe(false);
            expect(data.error || data.errors).toBeDefined();
        });
    });

});
