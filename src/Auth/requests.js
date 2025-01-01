const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// "fb37c388553742ae88af3d879e55b625";

const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&first_air_date.gte=2022-01-01&vote_count.gte=20`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;

/*


English Films
Trending now
Hindi Films
Anime
Golden Globe Award-winning TV Comedies
30-min laughs
Lifestyle
US supernatural Fantasy TV
Reality TV
Documentaries
Hollywood Films
US TV shows
Action thriller

*/
