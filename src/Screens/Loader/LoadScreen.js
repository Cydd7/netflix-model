import React from "react";
import netflixIntro from "../../Media/netflix references/NetflixLogoAnimation.mkv";
import "./LoadScreen.css";

function LoadScreen({ setIntroEnded, video, muteStatus }) {
  function end() {
    setIntroEnded(true);
  }

  function start() {
    console.log(video);
    console.log(video.current);
    video.current.muted = muteStatus;
    video.current.play();
  }

  return (
    <div className="loader-wrapper">
      <video
        ref={video}
        onLoad={start}
        onCanPlay={start}
        onEnded={end}
        className="loader-video"
        muted
      >
        <source src={netflixIntro} type="video/mp4" />
      </video>
    </div>
  );
}

export default LoadScreen;
