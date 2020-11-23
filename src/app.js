const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherApp = require('./utils/weather');
const app = express();
const publicDirectory = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About me",
        name: "Arfat"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help you",
        helpText: "This is some helpful text"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error:"you must provide address"
        })

        geoCode(req.query.address, (err, {longitude,latitude}={}) => {
            if (err) {
                console.log("Unable to geocode");
            }
            else {
                weatherApp(longitude,latitude,(err,response)=>{
                    if(err)
                        return res.send({
                            error:"Unable to process"
                        })
                    else{
                        return res.send({
                                   response
                        })
                    }
                });
            }
        })
        
})
app.get('/help/*',(req,res)=>{
    res.send("Article not found");
})
app.get('*',(req,res)=>{
    res.send('<h1>404</h1>')
})
app.listen(3001, () => {
    console.log("Server is up on 3001");
})