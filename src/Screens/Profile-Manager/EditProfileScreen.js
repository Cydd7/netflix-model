import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProfiles,
  setAllProfiles,
} from "../../Features/allProfilesSlice";
import { selectUser } from "../../Features/userSlice";
import db from "../../Auth/firebase";
import DeleteScreen from "./DeleteScreen";
import EditAvatarScreen from "./EditAvatarScreen";
import "./EditProfileScreen.css";

function EditProfileScreen({ editCancel, editProfile }) {
  const user = useSelector(selectUser);
  const allprofiles = useSelector(selectAllProfiles);
  const dispatch = useDispatch();

  const [name, setName] = useState(editProfile.name);
  const [logoNo, setLogoNo] = useState(editProfile.logoNo);
  const [editAvatar, setEditAvatar] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  function handleUpdate(e) {
    const name = e.target.value;
    setName(name);
  }

  function saveEdit() {
    (async () => {
      const payload = { name: name, logoNo: logoNo };
      var a = allprofiles;
      a = a.filter((profile) => {
        return profile.uid !== editProfile.uid;
      });
      a = [...a, payload];
      dispatch(setAllProfiles(a));

      const docRef = doc(
        db,
        `customers/${user.uid}/allProfiles`,
        editProfile.uid
      );
      setDoc(docRef, payload);
    })();

    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   alert(errorCode + errorMessage);
    // });
    editCancel();
  }

  return editAvatar ? (
    <EditAvatarScreen setEditAvatar={setEditAvatar} setLogoNo={setLogoNo} />
  ) : deleteAccount ? (
    <DeleteScreen
      setDeleteAccount={setDeleteAccount}
      logoNo={logoNo}
      user={user}
      editProfile={editProfile}
      dispatch={dispatch}
      setAllProfiles={setAllProfiles}
      allprofiles={allprofiles}
      editCancel={editCancel}
    />
  ) : (
    <div className="profileScreen-box-2">
      <div className="profileScreen-title-2">Edit Profile</div>

      <div className="profileScreen-info">
        <div className="profileScreen-avatar">
          <img
            src={require(`../../Media/profileLogos/logo${logoNo}.png`)}
            alt=""
          />
          <div
            onClick={() => setEditAvatar(true)}
            className="editProfileScreen-darkcircle"
          >
            <img
              className="editProfileScreen-pencil"
              src={require("../../Media/pencil.png")}
              alt="edit"
            />
          </div>
        </div>
        <input
          onSubmit={saveEdit}
          onChange={handleUpdate}
          className="enter-name"
          type="text"
          value={name}
          placeholder={editProfile.name}
          autoFocus
        />
      </div>
      <span className="button-wrapper">
        <div
          onClick={saveEdit}
          className="profileScreen-button profileScreen-button-2"
        >
          Save
        </div>
        <div onClick={editCancel} className="profileScreen-button">
          Cancel
        </div>
        <div
          onClick={() => setDeleteAccount(true)}
          className="profileScreen-button"
        >
          Delete Profile
        </div>
      </span>
    </div>
  );
}

export default EditProfileScreen;
