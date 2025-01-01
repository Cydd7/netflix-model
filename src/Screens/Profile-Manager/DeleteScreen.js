import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../Auth/firebase";
import "./DeleteScreen.css";

function DeleteScreen({
  setDeleteAccount,
  logoNo,
  user,
  editProfile,
  dispatch,
  setAllProfiles,
  allprofiles,
  editCancel,
}) {
  function handleDelete() {
    (async () => {
      var a = allprofiles;
      a = a.filter((profile) => {
        return profile.uid !== editProfile.uid;
      });
      dispatch(setAllProfiles(a));

      const docRef = doc(
        db,
        `customers/${user.uid}/allProfiles/`,
        editProfile.uid
      );
      deleteDoc(docRef);
    })().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    });
    setDeleteAccount(false);
    editCancel();
  }

  return (
    <div className="profileScreen-box-2">
      <div className="profileScreen-title-2">Delete Profile?</div>

      <div className="profileScreen-info">
        <div className="profileScreen-avatar">
          <img
            src={require(`../../Media/profileLogos/logo${logoNo}.png`)}
            alt=""
          />
        </div>
        <div className="deleteScreen-warning">
          This profile's history - including My List - will be gone forever, and
          you won't be able to access it again.
        </div>
      </div>
      <span className="button-wrapper">
        <div
          onClick={() => setDeleteAccount(false)}
          className="profileScreen-button profileScreen-button-2"
        >
          Keep Profile
        </div>

        <div onClick={handleDelete} className="profileScreen-button">
          Delete Profile
        </div>
      </span>
    </div>
  );
}

export default DeleteScreen;
