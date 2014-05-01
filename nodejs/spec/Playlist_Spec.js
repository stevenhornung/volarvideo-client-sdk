var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Playlists", function() {
    var volar = new Volar(api_key, secret, base_url);
    var playlist;

    it("can fetch playlists", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests"};
            volar.playlists(params, function(rt_error, rt_data) {
                error = rt_error;
                data = rt_data
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "data/error to be set", 5000);

        runs(function() {
            expect(data).not.toBeNull();
            expect(error).toBeNull();
        });
    });

    it("can create a playlist", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "title": "Node.js_SDK_Playlist"};
            volar.playlist_create(params, function(rt_error, rt_data) {
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
            expect(data.playlist.id).toBeDefined();
            playlist = data.playlist;
        });
    });

    it("can update title of playlist", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": playlist.id, "title": "Playlist_Title_Update"};
            volar.playlist_update(params, function(rt_error, rt_data) {
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

    it("can update description of playlist", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": playlist.id, "description": "Playlist description update"};
            volar.playlist_update(params, function(rt_error, rt_data) {
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

    it("can assign a broadcast to a playlist", function() {
        var flag, data, error;
        var broadcast;

        // Create broadcast to assign to a playlist
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
            broadcast = data.broadcast;
            flag, data, error = null;
        });

        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id, "playlist_id": playlist.id};
            volar.broadcast_assign_playlist(params, function(rt_error, rt_data) {
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
            flag, data, error = null;
        });

        // Delete created broadcast
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

    it("can remove a broadcast from a playlist", function() {
        var flag, data, error;
        var broadcast;

        // Create broadcast to assign to a playlist
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
            broadcast = data.broadcast;
            flag, data, error = null;
        });


        runs(function() {
            var params = {"site": "sdk-tests", "id": broadcast.id, "playlist_id": playlist.id};
            volar.broadcast_remove_playlist(params, function(rt_error, rt_data) {
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
            flag, data, error = null;
        });

        // Delete created broadcast
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

    it("can delete a playlist", function() {
        var flag, data, error;

        runs(function() {
            var params = {"site": "sdk-tests", "id": playlist.id};
            volar.playlist_delete(params, function(rt_error, rt_data) {
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
