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
      lat: request.query.lat,
      lon: request.query.lon,
    })
    .then(weatherData => {
      response.json(weatherData.body.data.map(day => new DailyForecast(day)));
    })
    .catch(error => {
      handleError(error, response);
    });
});

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

// get movies from api
app.get(`/movies/:id`, (request, response) => {
  let citySearched = request.params.id;
  // console.log(request.params.api_key);
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: `${citySearched}`,
    })
    .then(movieData => {
      // response.send(movieData.body.results);
      response.json(movieData.body.results.map(movie => new MovieItem(movie)));
    });
});

function MovieItem(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.average_votes;
  this.total_votes = movie.total_votes;
  this.image_url = movie.image_url;
  this.popularity = movie.popularity;
  this.released_on = movie.released_on;
}

function handleError(error, response) {
  response.status(500).send(' Status Code: 500 - Internal server error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));





