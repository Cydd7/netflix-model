import React, { useEffect, useState } from "react";
import Nav from "../../Components/Nav";
import "./FirstScreen.css";

function FirstScreen({ play, toggle, sound }) {
  const [loadStatus, setLoadStatus] = useState(false);

  useEffect(() => {
    setLoadStatus(true);
  }, []);

  return (
    <div className="FirstScreen">
      <div className="FirstScreen-wrapper">
        <Nav black hideAvatar />
        <div
          className={`FirstScreen-button ${
            loadStatus && "FirstScreen-button-loaded"
          }
          `}
        >
          <div className={sound ? "sound" : "sound-mute"}>
            <div className="sound--icon fa fa-volume-off"></div>
            <div className="sound--wave sound--wave_one"></div>
            <div className="sound--wave sound--wave_two"></div>
          </div>
          <input onClick={toggle} type="checkbox" className="checkbox" />
          <div className="knobs"></div>
          <div className="knobs-color"></div>
          <div className="layer"></div>
        </div>

        <div
          className={`FirstScreen-span-anim ${
            loadStatus && "FirstScreen-span-anim-loaded"
          }`}
        >
          <div className="FirstScreen-span" href="" onClick={play}>
            PLAY
          </div>
        </div>
      </div>
      <div className="FirstScreen-copyright">&#169;2022 Siddhant Lodha</div>
    </div>
  );
}

export default FirstScreen;
