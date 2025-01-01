import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mute, unmute, selectMuteStatus } from "../../Features/muteStatusSlice";
import FirstScreen from "./FirstScreen";
import LoadScreen from "./LoadScreen";

function IntroScreen({ setIntroEnded }) {
  const [sound, setsound] = useState(true);
  const [load, setLoad] = useState(false);
  const video = useRef(null);
  const muteStatus = useSelector(selectMuteStatus);
  const dispatch = useDispatch();

  function toggle() {
    setsound((prev) => {
      return !prev;
    });
  }

  // function toggleMute() {
  //   var video = document.getElementById("intro");
  //   console.dir(video);
  //   video.muted = !video.muted;
  //   video.play();
  // }

  function play() {
    sound ? dispatch(unmute()) : dispatch(mute());
    setLoad(true);
  }
  return (
    <div className="IntroScreen-wrapper">
      {!load ? (
        <FirstScreen play={play} toggle={toggle} sound={sound} />
      ) : (
        <LoadScreen
          setIntroEnded={setIntroEnded}
          video={video}
          muteStatus={muteStatus}
        />
      )}
    </div>
  );
}

export default IntroScreen;
