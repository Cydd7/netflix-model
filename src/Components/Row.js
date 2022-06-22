import React, { useState, useEffect } from "react";
import axios from "../Auth/axios";
import "./Row.css";
import RowMovie from "./RowMovie";
// import VideoPlayer from "./VideoPlayer";
import ReactPlayer from "react-player";
import { selectMuteStatus } from "../Features/muteStatusSlice";
import { useSelector } from "react-redux";

//w500 -> for small pictures
//original -> for best quality
const baseURL = "https://image.tmdb.org/t/p/w500";

function Row({ id, title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [rowId, setRowId] = useState("");
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [rowHover, setRowHover] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [showMaskWrapper, setShowMaskWrapper] = useState(false);
  const [showReactPlayer, setShowReactPlayer] = useState(false);

  const muteStatus = useSelector(selectMuteStatus);

  var myTimeout, myTimeout2;

  // console.log("id", id);
  // console.log("Movies", movies);
  // console.log("PlayerLoaded", playerLoaded);
  // console.log("posOut: ", posOut);
  // console.log("timeOver", timeOver);

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

  useEffect(() => {
    for (let i = 0; i < movies.length; i++) {
      movies[i].key = i + 1;
    }
  }, [movies]);

  function handleMovieWrapperOver(movie) {
    // console.log("Entered movie : ", movie);
    setMovieId(movie.id);
    setRowId(id);

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

    myTimeout = setTimeout(() => {
      setShowReactPlayer(true);
      setShowMaskWrapper(true);
      setShowMask(true);
    }, 2000);

    myTimeout2 = setTimeout(() => {
      setTimeOver(true);
    }, 8000);
  }

  function handleMovieWrapperOut() {
    clearTimeout(myTimeout);
    clearTimeout(myTimeout2);
    setTrailerUrl([]);
    setMovieId("");
    setRowId("");
  }

  const handlePlayerOut = () => {
    clearTimeout(myTimeout2);
    setShowReactPlayer(false);
    setShowMask(false);

    setPlayerLoaded(false);
    setTimeOver(false);
  };

  const handleMaskWrapperOut = () => {
    clearTimeout(myTimeout2);
    setShowMask(false);
    setShowMaskWrapper(false);
    setShowReactPlayer(false);

    setTrailerUrl([]);
    setMovieId("");
    setRowId("");

    setPlayerLoaded(false);
    setTimeOver(false);
    // setPosOut(true);
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
                  onMouseOver={() => handleMovieWrapperOver(movie)}
                  onMouseOut={() => handleMovieWrapperOut()}
                  className={`movie-wrapper ${isLargeRow && "poster-wrapper"}`}
                >
                  {/* <VideoPlayer
                  movie={movie}
                  isLargeRow={isLargeRow}
                  trailerUrl={trailerUrl}
                  movieId={movieId}
                  playerLoaded={playerLoaded}
                  timeOver={timeOver}
                  posOut={posOut}
                  handleMouseLeave={handleMouseLeave}
                  handleVideoLoaded={handleVideoLoaded}
                /> */}

                  <RowMovie
                    movie={movie}
                    isLargeRow={isLargeRow}
                    movieId={movieId}
                    playerLoaded={playerLoaded}
                    timeOver={timeOver}
                    baseURL={baseURL}
                  />

                  {trailerUrl[0] && movieId === movie.id && rowId === id && (
                    <div
                      className={`Row-react-player ${
                        (movie.key % 6 === 0 || movie.key % 5 === 0) &&
                        "Row-react-player-right"
                      }`}
                    >
                      {showReactPlayer && (
                        <ReactPlayer
                          className={`react-player-iframe ${
                            (movie.key % 6 === 0 || movie.key % 5 === 0) &&
                            "react-player-iframe-right"
                          }`}
                          url={`https://www.youtube.com/watch?v=${trailerUrl[0]}`}
                          onBufferEnd={handleVideoLoaded}
                          // light={true}
                          volume={1}
                          muted={muteStatus}
                          width={`${
                            timeOver ? (isLargeRow ? "600px" : "400px") : "0px"
                          }`}
                          height={`${isLargeRow ? "337.5px" : "225px"}`}
                          config={{
                            youtube: {
                              playerVars: {
                                autoplay: 1,
                                cc_load_policy: 1,
                                controls: 0,
                                disablekb: 1,
                                rel: 0,
                                origin: window.location.origin,
                              },
                            },
                          }}
                        />
                      )}

                      {showMaskWrapper && (
                        <div
                          onMouseOut={() => {
                            console.log("over");
                            handleMaskWrapperOut();
                          }}
                          className={`react-player-turnoff ${
                            (movie.key % 6 === 0 || movie.key % 5 === 0) &&
                            "react-player-turnoff-right"
                          } ${isLargeRow && "react-player-turnoff-large"}`}
                        ></div>
                      )}

                      {showMask && (
                        <div
                          onMouseOut={() => handlePlayerOut()}
                          className={`react-player-mask ${
                            (movie.key % 6 === 0 || movie.key % 5 === 0) &&
                            "react-player-mask-right"
                          } ${isLargeRow && "react-player-mask-large"}  ${
                            timeOver && playerLoaded && "react-player-mask-show"
                          }`}
                        ></div>
                      )}
                    </div>
                  )}
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
              className={`row-arrow row-prev ${
                isLargeRow && "row-arrow-large"
              }`}
            >
              <img src={require("../Media/left.png")} alt="<" />
            </div>
            <div
              onClick={() => {
                showNext(id);
              }}
              className={`row-arrow row-next ${
                isLargeRow && "row-arrow-large"
              }`}
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
