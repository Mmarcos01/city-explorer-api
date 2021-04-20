'use strict';
//imports:
const express = require('express');
const cors = require('cors');
const getWeather = require('./weather');
const getMovies = require('./movies');

//use .env file that was created:
require('dotenv').config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

// call weather and movies:
app.get('/weather', getWeather);
app.get('/movies', getMovies);

// function handleError(error, response) {
//   response.status(500).send(' Status Code: 500 - Internal server error');
// }

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));





