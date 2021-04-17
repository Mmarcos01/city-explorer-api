const superagent = require('superagent');
require('dotenv').config();

function getMovies(request, response) {
  let citySearched = request.params.id;
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: `${citySearched}`,
      //testing local:
      // query: 'Seattle',
    })
    .then(movieData => {
      // response.send(movieData.body.results);
      response.json(movieData.body.results.map(movie => new MovieItem(movie)));
    })
    .catch(error => {
      console.error(error);
      // handleError(error, response);
    });
}

function MovieItem(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.vote_average = movie.vote_average;
  this.vote_count = movie.vote_count;
  this.poster_path = movie.poster_path;
  this.popularity = movie.popularity;
  this.release_date = movie.release_date;
}

module.exports = getMovies;
