'use strict';
//works like an import:
const express = require('express');
const cors = require('cors');
//use .env file that was created:
require('dotenv').config();
//import weather:
const weatherData = require('./data/weather.json');

const app = express();
//ensure data is accessible from the React frontend:s
app.use(cors());
//defines port and sets a backup default as 3001:
const PORT = process.env.PORT || 3001;

//<most of server definition goes here>

//listening for GET requests at the path '/'
app.get('/', (request, response) => {
  response.send('hello');
});

// '/weather' will be the path in the browser, used on the front-end
//forecastArr maps over weatherData, creating new instance of DailyForcast- showing properties of date and description

app.get('/weather', (request, response) => {
  try {
    let forecastArr = weatherData.data.map(day => new DailyForecast(day));
    response.json(forecastArr);
  } catch (error) {
    handleError(error, response);
  }
});


//Create a constructor function for a `Forecast` object, that has a properties of `date` and `description`.
function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleError(error, response) {
  response.status(500).send(' Status Code: 500 - Internal server error');
}

//</most of server definition goes here />

//setting up the server to listen will always be the last step in server files: (console.log callback for PoL)
//app.listen always takes 2 arguments: first argument is the port to listen on, second is a callback function to call when server is successfully listening
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
