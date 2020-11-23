const request= require('request');



const weatherApp = (longitude, latitude,callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=edc8d9c7657cb680229614170a1d0ae5&query='+latitude+','+longitude+'&units=f';

    request({ url: weatherUrl, json: true }, (err, res) => {
        if(err)
            callback("Failed to connect",undefined);
        else{
            
            callback(undefined,res.body.location.name+" has temprature of "+res.body.current.temperature+" and it feels like "+res.body.current.feelslike);
        }
    })


}

module.exports=weatherApp;