
const request = require('request');


const geoCode = (location, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?limit=2&access_token=pk.eyJ1IjoibXVqdGFiYTk3IiwiYSI6ImNraHR0NjZrNzByOTgyeW54dmdoNW8wNGoifQ.Ipp8r0_PQACXjLseOMu7bA'

    request({ url: geoCodeUrl, json: true }, (err, res) => {
        if (err) callback("Unable to connect", undefined);
        else if (res.body.error) {
            callback("Unable to connect", undefined);
        }
        else {
            const data = res.body.features[0];
            const longitute = data.center[0];
            const latitude = data.center[1];
        
            callback(undefined, {
                latitude:data.center[1],
                longitude:data.center[0],
                place:data.place_name
                

            });
        }
    })

}


module.exports=geoCode;