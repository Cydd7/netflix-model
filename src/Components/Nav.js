import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProfiles } from "../Features/allProfilesSlice";
import "./Nav.css";
import {
  resetActiveProfile,
  selectActiveProfile,
  setActiveProfile,
} from "../Features/activeProfileSlice";
import { getAuth, signOut } from "firebase/auth";

function Nav({ black, hideAvatar, showOptions }) {
  const [show, handleShow] = useState(false);
  // const [searchWord, setSearchWord] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  const activeProfile = useSelector(selectActiveProfile);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > (window.innerHeight * 10) / 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  // function update(event) {
  //   setSearchWord(event.target.value);
  //   // Search(event.target.value, sl, l);
  // }

  return (
    <div className={`nav ${(show && "nav_black") || (black && "nav_black")}`}>
      <img
        onClick={() => navigate("/")}
        src={require("../Media/net_logo.png")}
        alt="NETFLIX"
        className="nav_logo"
      ></img>

      {!hideAvatar && (
        <img
          onClick={() => navigate("/account")}
          src={require(`../Media/profileLogos/logo${activeProfile.logoNo}.png`)}
          alt=""
          className="avatar"
        />
      )}

      {/* {showOptions && (
        <div className="Nav-options">
          <div className="Nav-option">Home</div>
          <div className="Nav-option">My list</div>
        </div>
      )}

      {showOptions && (
        <form className="Nav-search-form" onSubmit={(e) => e.preventDefault()}>
          <img src={require("../Media/search-icon.png")} alt="" />
          <input
            onChange={update}
            onSubmit={update}
            name="searchBar"
            value={searchWord}
            className="Nav-search-input"
            placeholder="Search"
          />
        </form>
      )} */}

      {!hideAvatar && (
        <div className="dropdown">
          <img
            src={require("../Media/dropdown_white.png")}
            alt=">"
            className="dropdown-btn"
          />

          <div className="dropdown-content-wrapper">
            <div className="dropdown-content">
              <div className="dropdown-content-block">
                <img
                  src={require("../Media/dropdown_white.png")}
                  alt=">"
                  className="dropdown-tooltip"
                />
                {allProfiles.map((profile) => (
                  <div className="dropdown-span-wrapper">
                    <img
                      className="dropdown-span-img"
                      src={require(`../Media/profileLogos/logo${profile.logoNo}.png`)}
                      alt=""
                    />
                    <span
                      key={profile.uid}
                      onClick={() => {
                        dispatch(setActiveProfile(profile));
                        navigate("/");
                      }}
                    >
                      {profile.name}
                    </span>
                  </div>
                ))}
                <div className="dropdown-span-wrapper">
                  <img
                    className="dropdown-span-img2"
                    src={require("../Media/pencil.png")}
                    alt=""
                  />
                  <span onClick={() => navigate("/manageProfiles")}>
                    Manage Profiles
                  </span>
                </div>
              </div>

              <div className="dropdown-content-block">
                <div className="dropdown-span-wrapper">
                  <img
                    className="dropdown-span-img2"
                    src={require("../Media/avatar-simple.png")}
                    alt=""
                  />
                  <span onClick={() => navigate("/account")}>Account</span>
                </div>
              </div>

              <div className="dropdown-content-block">
                <div className="dropdown-span-wrapper">
                  <span
                    onClick={() => {
                      dispatch(resetActiveProfile());
                      signOut(getAuth());
                    }}
                    style={{ margin: "0 auto" }}
                  >
                    Sign out of Netflix
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
