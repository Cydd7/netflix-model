import React from "react";
import "./Row.css";

function RowMovie({
  movie,
  isLargeRow,
  movieId,
  playerLoaded,
  timeOver,
  baseURL,
}) {
  return (
    <div>
      {!(playerLoaded && timeOver && movieId === movie.id) && (
        <>
          <div className="box-relative">
            <img
              key={movie.id}
              className={`movie-backdrop ${isLargeRow && "movie-poster"}`}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title || movie.name}
            />
          </div>

          {movie.images.logos[0] && !isLargeRow && (
            <img
              className="movie-logo"
              src={`https://image.tmdb.org/t/p/original${movie.images.logos[0].file_path}`}
              alt=""
            />
          )}

          {isLargeRow && (
            <img
              className="n-logo"
              src={require("../Media/N.png")}
              alt=""
            ></img>
          )}
        </>
      )}
    </div>
  );
}

export default RowMovie;
