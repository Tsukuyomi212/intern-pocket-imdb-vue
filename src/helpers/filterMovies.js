export function filterMovies(genre, movies) {
  return movies.filter(movie => movie.genre.name === genre);
}