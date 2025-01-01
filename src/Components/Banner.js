import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import requests from "../Auth/requests";
import axios from "../Auth/axios";
import { truncate, showDesc, hideDesc } from "./Utils";
import "./Banner.css";
import { useDispatch, useSelector } from "react-redux";
import { mute, selectMuteStatus, unmute } from "../Features/muteStatusSlice";

function Banner() {
  const [movie, setMovie] = useState("");
  const [playStatus, setPlayStatus] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState([]);
  const [desc, setDesc] = useState(true);
  const [vid, setVid] = useState(false);
  const [volume, setVolume] = useState(1);
  const [blackMask, setBlackMask] = useState(false);

  const muteStatus = useSelector(selectMuteStatus);
  const [muteIcon, setMuteIcon] = useState(false);
  const dispatch = useDispatch();

  //  Using this hook so that useEffect loads only once during page load
  const [stable] = useState("initial");

  useEffect(() => {
    async function fetchData() {
      //  List of movies to fecth from randomly.
      const genreList = [
        "fetchTopRated",
        "fetchActionMovies",
        "fetchComedyMovies",
        "fetchRomanceMovies",
      ];

      var index = Math.floor(Math.random() * 4);
      const request = await axios.get(requests[genreList[index]]);

      const selectedMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];

      const newStr = `/movie/${selectedMovie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=images,videos,trailers&include_image_language=en,null`;
      const newRequest = await axios.get(newStr).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });

      // console.log("selectedMovie: ", selectedMovie);
      // console.log("newRequest: ", newRequest.data);
      setMovie(newRequest.data);
    }
    fetchData();
  }, [stable]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < (window.innerHeight * 10) / 100) {
        setPlayStatus(true);
        setBlackMask(false);
      } else {
        setPlayStatus(false);
        setBlackMask(true);
      }
    });
  }, [stable]);

  useEffect(() => {
    movie?.trailers?.youtube.forEach((item) => {
      if (item.type.toLowerCase() === "trailer") {
        setTrailerUrl((prevItems) => {
          return [...prevItems, item.source];
        });
      }
    });
  }, [movie]);

  useEffect(() => {
    muteIcon ? dispatch(mute()) : dispatch(unmute());
  }, [muteIcon, dispatch]);

  // console.log(volume);
  // console.log("Banner movie: ", movie);
  // console.log(playStatus);
  // console.log(trailerUrl);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div
        className={`banner-video-wrapper ${vid && "banner-video-wrapper-2"} ${
          blackMask && "banner-video-wrapper-3"
        }`}
      >
        <ReactPlayer
          onBufferEnd={() => {
            setVid(true);
          }}
          className="react-player"
          url={`https://www.youtube.com/watch?v=${trailerUrl[0]}`}
          volume={volume}
          muted={muteStatus}
          loop={true}
          width="100%"
          height="100%"
          playing={playStatus}
          onPause={() => setPlayStatus(false)}
          onPlay={() => setPlayStatus(true)}
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
      </div>

      <div className="banner-contents">
        <div
          className={`logo-wrapper ${
            desc ? "logo-wrapper-small" : "logo-wrapper-large"
          }`}
        >
          {movie?.images?.logos[0] ? (
            <img
              className="banner-logo"
              src={`https://image.tmdb.org/t/p/original/${movie.images?.logos[0]?.file_path}`}
              alt={movie.title || movie.name || movie.original_name}
            />
          ) : (
            <h1 className="banner-title">
              {movie.title || movie.name || movie.original_name}
            </h1>
          )}
        </div>

        <p
          className={` banner-description ${
            desc ? "banner-description-hide" : "banner-description-show"
          }`}
        >
          {truncate(movie.overview, 150)}
        </p>
        <div className="banner-buttons">
          <button className="banner-button">
            {" "}
            <img
              className="play-icon"
              src={require("../Media/play.png")}
              alt=""
            />{" "}
            <span>Play</span>
          </button>
          <button className="banner-button myList">
            <span>My list + </span>
          </button>
        </div>
      </div>
      <div className="banner-fadeTop"></div>
      <div className="banner-fadeSide"></div>
      <div
        onMouseEnter={() => showDesc(setDesc)}
        onMouseLeave={() => hideDesc(setDesc)}
        className="desc-cover"
      ></div>
      <div className="banner-fadeBottom"></div>
      <div className="banner-mask"></div>
      <div
        onClick={() => {
          muteIcon ? setVolume(1) : setVolume(0);
          setMuteIcon((prev) => {
            return !prev;
          });
        }}
        className="banner-mute-icon"
      >
        {muteIcon ? (
          <img src={require("../Media/mute-icon-muted.png")} alt="unmute" />
        ) : (
          <img src={require("../Media/mute-icon-unmuted.png")} alt="mute" />
        )}
      </div>
    </header>
  );
}

export default Banner;
