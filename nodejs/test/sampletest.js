var Volar = require("./volar.js");

var volar = new Volar("Nk4TrqkNJN87xT01NtDfGqhdO9qvOr1R", "&5Jtq>r/!828rK]dYxdpEJz-a4D8GDP3", "uk.volarvideo.com");

/*
volar.broadcast_poster({id: '1'}, "/Users/stevenhornung/Downloads/IMG_1777.jpg", "my_image",
    function(error, data){
    if(error) {
        console.log(error);
        return;
    }

    console.log(data);
});
*/

volar.broadcast_create({
    site: 'site4',
    title: 'another',
    contact_name: "steven hornung",
    contact_phone: "9999999999",
    contact_email: "blah@blah.com"},

    function(error, data) {
    if(error) {
        console.log(error);
        return;
    }

    console.log(data);
});
/*
volar.broadcasts({site: 'site4'}, function(error, data) {
    if(error) {
        console.log(error);
        return;
    }

    console.log(data);
});

volar.sections({site: 'site4'}, function(error, data) {
    if(error) {
        console.log(error);
        return;
    }

    console.log(data);
});
*/
