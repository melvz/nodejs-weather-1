const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'b192e87ced643d885bbfe03d64a8e766';


const port = process.env.PORT || 8080;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees Centigrade in ${weather.name} with ${weather.main.humidity} percent humidity. \n\n Aviators (pilots) must expect ${weather.weather[0].description} to occur in their areal vicinity`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, (err) => {
  if (!err) {
     console.log(`App started on port ${port}`);
  } else {
    console.log(err);
  }
});

module.exports = app;
