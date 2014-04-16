var Volar = require("./volar.js");

var volar = new Volar("fTeFKp1QWt7ESYZO0NB6Zvf1xvKCCTKC", "4R>*1V.RtE:z?a+Z*3K]1.z3AAv<Jo29", "uk.volarvideo.com");

volar.broadcasts({site: 'site4'}, function(str) {
    console.log(str);
});
