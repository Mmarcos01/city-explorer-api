'use strict';
//works like an import:
const express = require('express');
const cors = require('cors');
//use .env file that was created:
require('dotenv').config();
//import weather:

// const weatherData = require('./data/weather.json');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

//listening for GET requests at the path '/'
app.get('/', (request, response) => {
  response.send('hello');
});

const superagent = require('superagent');

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHER_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon,
    })
    .then(weatherData => { 
      response.json(weatherData.body.data.map(day => new DailyForecast(day)));
    });
});

// app.get('/weather', (request, response) => {
//   try {
//     let forecastArr = weatherData.data.map(day => new DailyForecast(day));
//     response.json(forecastArr);
//   } catch (error) {
//     handleError(error, response);
//   }
// });


function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

// //get movies from api
// app.get('/movies', getMovies);
// //callback function, could be written within like get weather above
// function getMovies(request, response) {
//   const movieQuery = request.query.movieSearch;
//   const url = 'https://api.themoviedb.org/3/movie/550?api_key=09da44311829b7b5aeabf8bcd0ca8042';
//   const query = {
//     client_id: process.env.MOVIE_API_KEY,
//     query: movieQuery,
//   }
// }

function handleError(error, response) {
  response.status(500).send(' Status Code: 500 - Internal server error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));





