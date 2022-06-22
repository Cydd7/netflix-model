import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectMuteStatus } from "../Features/muteStatusSlice";

import "./Row.css";

function VideoPlayer({
  movie,
  isLargeRow,
  trailerUrl,
  movieId,
  playerLoaded,
  timeOver,
  posOut,
  handleMouseLeave,
  handleVideoLoaded,
}) {
  const muteStatus = useSelector(selectMuteStatus);

  return (
    <>
      {trailerUrl[0] && movieId === movie.id && !posOut && (
        <div className="Row-react-player">
          <ReactPlayer
            className={`react-player-iframe  ${
              playerLoaded && "react-player-iframe-show"
            }`}
            url={`https://www.youtube.com/watch?v=${trailerUrl[0]}`}
            onBufferEnd={handleVideoLoaded}
            // light={true}
            volume={1}
            muted={muteStatus}
            width={`${
              playerLoaded && timeOver
                ? isLargeRow
                  ? "600px"
                  : "400px"
                : "0px"
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

          <div
            onMouseOut={() => handleMouseLeave()}
            className="react-player-mask"
          ></div>
        </div>
      )}
    </>
  );
}

export default VideoPlayer;
