var Volar = require("../volar.js");
var config = require('./test-config.json');

var api_key = config.api_key,
    secret = config.secret,
    base_url = config.base_url;


describe("Account info", function() {
    var volar = new Volar(api_key, secret, base_url);
    var flag, data, error;

    var param_seed = [];

    for(var i = 0; i < 9; ++i) {
        for(var j = 0; j < 3; ++j) {
            param_seed[i] = j;

            params = {site: 'nodejs', expected: true, empty: false}

            if(param_seed[0] === 1) {
				params['page'] = 'book';
            }
			else if(param_seed[0] === 2) {
				params['page'] = '2';
            }

			if(param_seed[1] === 1) {
				params['per_page'] = 'several';
            }
			else if(param_seed[1] === 2) {
				params['per_page'] = 30;
            }

			if(param_seed[2] === 1) {
				params['id'] = 'social security';
				params['empty'] = true;
            }
			else if(param_seed[2] === 2) {
				params['id'] = 1;
            }

			if(param_seed[3] === 1) {
				params['slug'] = 'notasite';
				params['empty'] = true;
            }
			else if(param_seed[3] === 2) {
				params['slug'] = 'volar';
            }

			if(param_seed[4] === 1) {
				params['title'] = "This isn't the site you're looking for";
				params['empty'] = true;
            }
			else if(param_seed[4] === 2) {
				params['title'] = 'Test_Broadcast_Archived';
            }

			if(param_seed[5] === 1) {
				params['sort_by'] = 'pizazz';
            }
			else if(param_seed[5] === 2) {
				params['sort_by'] = 'status';
            }

			if(param_seed[6] === 1) {
				params['sort_dir'] = 'north';
            }
			else if(param_seed[6] === 2) {
				params['sort_dir'] = 'desc';
            }

			if(params['expected']) {
				delete params['expected'];

				if(params['empty']) {
                    it("where expected no sites", function() {
    					delete params['empty'];

                        runs(function() {
                              volar.broadcasts(params, function(rt_error, rt_data) {
                                  error = rt_error;
                                  data = rt_data
                                  flag = true;
                              });
                        });

                        waitsFor(function() {
                            return flag;
                        }, "Data/error to be set", 1000);

                        runs(function() {
                            var json_body = JSON.parse(data);
                            expect(json_body.sites.length).toEqual(0);
                        });
                    });
                }

				else {
                    it("where expected empty response", function() {
    					delete params['empty'];

                        runs(function() {
                              volar.broadcasts(params, function(rt_error, rt_data) {
                                  error = rt_error;
                                  data = rt_data
                                  flag = true;
                              });
                        });

                        waitsFor(function() {
                            return flag;
                        }, "Data/error to be set", 1000);

                        runs(function() {
                            var json_body = JSON.parse(data);
                            expect(json_body.sites.length).toBeGreaterThan(0);
                        });
                    });
                }
            }

			else {
                it("where expected api failure", function() {
    				delete params['expected'];
    				delete params['empty'];

                    runs(function() {
                          volar.broadcasts(params, function(rt_error, rt_data) {
                              error = rt_error;
                              data = rt_data
                              flag = true;
                          });
                    });

                    waitsFor(function() {
                        return flag;
                    }, "Data/error to be set", 1000);

                    runs(function() {
                        var json_body = JSON.parse(data);
                        expect(json_body.sites).toBeNull();
                    });
				});
            }

        }
    }

});
