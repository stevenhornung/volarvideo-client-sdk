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
        }, "Data/error to be set", 1000);

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
        }, "Data/error to be set", 1000);

        runs(function() {
            expect(error).not.toBeNull();
        });
    });

    it("called with valid site parameter succeeds", function() {
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
        }, "Data/error to be set", 1000);

        runs(function() {
            expect(error).toBeNull();
        });
    });

    describe("called with empty, invalid, and valid parameters", function() {
        var flag, data, error;
        var param_seed = [];

        for(var i = 0; i < 12; ++i) {
            for(var j = 0; j < 3; ++j) {
                param_seed[i] = j;

                var params = {site: 'nodejs', expected: true, empty: false};

                if(param_seed[0] === 1) {
                    params['list'] = 'grocery';
                }
                else if(param_seed[0] === 2) {
                    params['list'] = 'archived';
                }

                if(param_seed[1] === 1) {
					params['per_page'] = 'several';
                }
				else if(param_seed[1] === 2) {
					params['per_page'] = 30;
                }

				if(param_seed[2] === 1) {
					params['section_id'] = -5;
					params['empty'] = true;
                }
				else if(param_seed[2] === 2) {
					params['section_id'] = 1;
                }

				if(param_seed[3] === 1) {
					params['playlist_id'] = -9;
					params['empty'] = true;
                }
				else if(param_seed[3] === 2) {
					params['playlist_id'] = 1;
                }

				if(param_seed[4] === 1) {
					params['id'] = 'social security';
                }
				else if(param_seed[4] === 2) {
					params['id'] = 495;
                }

				if(param_seed[5] === 1) {
					params['title'] = "This isn't the broadcast you're looking for";
					params['empty'] = true;
                }
				else if(param_seed[5] === 2) {
					params['title'] = 'Test_Broadcast_Archived';
                }

				if(param_seed[6] === 1) {
					params['autoplay'] = 'I guess';
                }
				else if(param_seed[6] === 2) {
					params['autoplay'] = true;
                }

				if(param_seed[7] === 1) {
					params['embed_width'] = '-1';
                }
				else if(param_seed[7] === 2) {
					params['embed_width'] = '640';
                }

				if(param_seed[8] === 1) {
					params['before'] = 'tomorrow';
                }
				else if(param_seed[8] === 2) {
					params['before'] = '04/22/2014';
                }

				if(param_seed[9] === 1) {
					params['after'] = 'earth';
                }
				else if(param_seed[9] === 2) {
					params['after'] = '03/03/2013';
                }

				if(param_seed[10] === 1) {
					params['sort_by'] = 'pizazz';
                }
				else if(param_seed[10] === 2) {
					params['sort_by'] = 'status';
                }

				if(param_seed[11] === 1) {
					params['sort_dir'] = 'north';
                }
				else if(param_seed[11] == 2) {
					params['sort_dir'] = 'desc';
                }

				if(params['expected']) {
					delete params['expected'];
					if(params['empty']) {
                        it("where expected no broadcasts", function() {
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
                                expect(json_body.broadcasts.length).toEqual(0);
                            });
                        });
                    }
					else {
                        it("where expected response", function() {
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
                                expect(json_body.broadcasts.length).toBeGreaterThan(0);
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
                            expect(json_body).toBeNull();
                        });
                    });
                }
            }
        }
    })
});
