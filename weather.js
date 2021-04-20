const superagent = require('superagent');

function getWeather(request, response) {
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
      console.error(error);
      // handleError(error, response);
    });
}

function DailyForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

module.exports = getWeather;
