import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveProfile } from "../../Features/activeProfileSlice";
import { selectAllProfiles } from "../../Features/allProfilesSlice";
import Nav from "../../Components/Nav";
import AddProfileScreen from "./AddProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import "./ProfileScreen.css";

function ProfileScreen({ edit }) {
  const allProfiles = useSelector(selectAllProfiles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addProfile, setAddProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(null);

  function add() {
    setAddProfile(true);
  }
  function cancel() {
    setAddProfile(false);
  }
  function editCancel() {
    setEditProfile(null);
  }
  function editSet(profile) {
    setEditProfile(profile);
  }

  // console.log(allProfiles);

  return (
    <div>
      <Nav hideAvatar />
      <div className="profileScreen-wrapper">
        <div className="profileScreen-body-wrapper">
          {addProfile ? (
            <AddProfileScreen cancel={cancel} />
          ) : editProfile ? (
            <EditProfileScreen
              editCancel={editCancel}
              editProfile={editProfile}
            />
          ) : (
            <div className="profileScreen-box">
              <div className="profileScreen-title">
                {edit ? "Manage Profiles:" : "Who's watching?"}
              </div>
              <div className="profileScreen-profiles">
                {allProfiles.map((profile) => {
                  // console.log("profile: ", profile);
                  return (
                    <div key={profile.uid} className="profileScreen-profile">
                      <div
                        onClick={() => {
                          if (edit) {
                            editSet(profile);
                          } else {
                            dispatch(setActiveProfile(profile));
                            navigate("/");
                          }
                        }}
                        className="profileScreen-avatar-logo"
                      >
                        <img
                          src={require(`../../Media/profileLogos/logo${profile.logoNo}.png`)}
                          alt={profile.name}
                        ></img>
                        <div
                          className={`profileScreen-avatar-selected ${
                            edit && "profileScreen-avatar-selected-dark"
                          }`}
                        >
                          {edit && (
                            <img
                              src={require("../../Media/pencil.png")}
                              alt="Edit"
                            />
                          )}
                        </div>
                      </div>
                      <div>{profile.name}</div>
                    </div>
                  );
                })}

                <div className="profileScreen-profile">
                  <div onClick={add} className="add-profile">
                    <img
                      src={require("../../Media/add-icon.png")}
                      alt="+"
                    ></img>
                  </div>
                  <div>Add Profile</div>
                </div>
              </div>
              <div
                onClick={() => {
                  edit ? navigate("/profile") : navigate("/manageProfiles");
                }}
                className={`profileScreen-button ${
                  edit && "profileScreen-button-2"
                }`}
              >
                {edit ? "Done" : "Manage Profiles"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
