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

//weather-data will be the path in the browser, used on the front-end
app.get('/weather', (request, response) => {
  let forecastArr = weatherData.data.map(day => new DailyForecast(day));
  response.json(forecastArr);
});

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

//</most of server definition goes here />

//setting up the server to listen will always be the last step in server files: (console.log callback for PoL)
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
