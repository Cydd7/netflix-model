import React, { useState, useEffect } from "react";
import axios from "../Auth/axios";
import "./Row.css";
import RowMovie from "./RowMovie";
import VideoPlayer from "./VideoPlayer";

//w500 -> for small pictures
//original -> for best quality
const baseURL = "https://image.tmdb.org/t/p/w500";

function Row({ id, title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [posOut, setPosOut] = useState(true);
  const [rowHover, setRowHover] = useState(false);

  var myTimeout, myTimeout2;

  // console.log("id", id);

  // useEffect(() => {
  //   var rows = document.getElementsByClassName("row-flexbox");
  //   console.log("rows: ", rows);

  //   for (let i = 0; i < rows.length; i++) {
  //     const row = rows[i];
  //     var left = 0;

  //     for (let j = 0; j < row.childNodes.length; j++) {
  //       const box = row.childNodes[j];
  //       box.style.setProperty("left", left + "px");
  //       console.log(box.style);
  //       left += 160;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    var element = document.getElementById(movieId);

    if (element) {
      element.addEventListener("mouseout", () => {
        clearTimeout(myTimeout);
        clearTimeout(myTimeout2);
        setTrailerUrl([]);
        setPlayerLoaded(false);
        setTimeOver(false);
        setPosOut(true);
        console.log("inside mouseout");
      });
    }
  }, [movieId, myTimeout, myTimeout2]);

  useEffect(() => {
    (async () => {
      const request = await axios.get(fetchURL).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });

      setMovies(() => {
        return [];
      });

      request.data.results.forEach((movie) => {
        (async () => {
          var newStr = "";
          if (isLargeRow) {
            newStr = `/tv/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=images,videos,trailers&include_image_language=en,null`;
          } else {
            newStr = `/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=images,videos,trailers&include_image_language=en,null`;
          }
          const newRequest = await axios.get(newStr);
          newRequest?.data &&
            setMovies((movies) => {
              return [...movies, newRequest.data];
            });
        })().catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + errorMessage);
        });
      });
    })();
  }, [fetchURL, isLargeRow]);

  const handleMouseEnter = (movie) => {
    setPosOut(false);
    myTimeout = setTimeout(() => {
      setMovieId(movie.id);
      console.log("Entered movie : ", movie);
      // Returning all trailer urls for a particular movie
      movie?.trailers?.youtube.forEach((item) => {
        if (item.type.toLowerCase() === "trailer") {
          console.log(item.source);
          setTrailerUrl((prevItems) => {
            return [...prevItems, item.source];
          });
        }
      });
      // If trailers object is not found, then searching through all video urls for trailer url
      movie?.videos.results.forEach((item) => {
        if (item.type.toLowerCase() === "trailer" && item.official === true) {
          console.log(item.key);
          setTrailerUrl((prevItems) => {
            return [...prevItems, item.key];
          });
        }
      });
    }, 1000);

    myTimeout2 = setTimeout(() => {
      setTimeOver(true);
    }, 7000);
  };

  const handleMouseLeave = () => {
    clearTimeout(myTimeout);
    clearTimeout(myTimeout2);
    setTrailerUrl([]);
    setPlayerLoaded(false);
    setTimeOver(false);
    setPosOut(true);
  };

  function handleVideoLoaded() {
    console.log("ended");
    setPlayerLoaded(true);
  }

  function showPrev(id) {
    const row = document.getElementById(id);
    console.dir(row);
    var trans = row.style.getPropertyValue("transform");
    console.log("transform", trans);
    var matches = trans.match(/(-?\d+)/);
    console.log("matches", matches);
    if (!matches) {
      matches = [0];
    }

    if (matches[0] < 0) {
      const abc = `translateX(${parseInt(matches[0]) + 92}vw)`;
      console.log("abc", abc);
      row.style.setProperty("transform", abc);
    }
  }

  function showNext(id) {
    const row = document.getElementById(id);
    console.log(row);
    var trans = row.style.getPropertyValue("transform");
    trans = row.style.transform;
    console.log("transform", trans);
    var matches = trans.match(/(-?\d+)/);
    console.log("matches", matches);
    if (!matches) {
      matches = [0];
    }
    if (matches[0] > -((row.scrollWidth / row.offsetWidth - 1) * 100)) {
      row.style.setProperty(
        "transform",
        `translateX(${parseInt(matches[0]) - 92}vw)`
      );
    }
  }

  // console.log("PlayerLoaded", playerLoaded);
  // console.log("posOut: ", posOut);
  // console.log("timeOver", timeOver);

  return (
    <div
      onMouseEnter={() => {
        setRowHover(id);
      }}
      onMouseLeave={() => {
        setRowHover(-1);
      }}
      className={`row ${isLargeRow && "row-large"}`}
    >
      <h2>{title}</h2>
      <div className="row-flexbox-wrapper">
        <div
          id={id}
          className={`row-flexbox ${isLargeRow && "row-flexbox-large"}`}
        >
          {movies.map((movie) => {
            return (
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div
                  id={movie.id}
                  onMouseOver={() => handleMouseEnter(movie)}
                  onMouseOut={() => handleMouseLeave()}
                  className={`movie-wrapper ${isLargeRow && "poster-wrapper"}`}
                >
                  <VideoPlayer
                    movie={movie}
                    isLargeRow={isLargeRow}
                    trailerUrl={trailerUrl}
                    movieId={movieId}
                    playerLoaded={playerLoaded}
                    timeOver={timeOver}
                    posOut={posOut}
                    handleMouseLeave={handleMouseLeave}
                    handleVideoLoaded={handleVideoLoaded}
                  />

                  <RowMovie
                    movie={movie}
                    isLargeRow={isLargeRow}
                    movieId={movieId}
                    playerLoaded={playerLoaded}
                    timeOver={timeOver}
                    baseURL={baseURL}
                  />
                </div>
              )
            );
          })}
        </div>
        {rowHover === id && (
          <>
            <div
              onClick={() => {
                showPrev(id);
              }}
              className="row-arrow row-prev"
            >
              <img src={require("../Media/left.png")} alt="<" />
            </div>
            <div
              onClick={() => {
                showNext(id);
              }}
              className="row-arrow row-next"
            >
              <img src={require("../Media/right.png")} alt=">" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Row;
