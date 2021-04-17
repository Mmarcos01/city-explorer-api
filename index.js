'use strict';
//works like an import:
const express = require('express');
const cors = require('cors');
//use .env file that was created:
require('dotenv').config();
//import weather/movie.js:
const getWeather = require('./weather');
const getMovies = require('./movies');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

//listening for GET requests at the path '/'
app.get('/', (request, response) => {
  response.send('hello');
});

// const superagent = require('superagent');
app.get('/weather', getWeather);

// get movies from api
app.get('/movies/:id', getMovies);

// function handleError(error, response) {
//   response.status(500).send(' Status Code: 500 - Internal server error');
// }

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));





