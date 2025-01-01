import React from "react";
import "./EditAvatarScreen.css";

function EditAvatarScreen({ setEditAvatar, setLogoNo }) {
  const logosIterator = [...Array(22).keys()].slice(1, 22);
  return (
    <div className="editProfileScreen-avatars-box">
      {logosIterator.map((i) => (
        <div
          key={i}
          onClick={() => {
            setLogoNo(i);
            setEditAvatar(false);
          }}
          className="profileScreen-avatar-logo"
        >
          <img
            src={require(`../../Media/profileLogos/logo${i}.png`)}
            alt={`logo${i}`}
          ></img>
          <div className="profileScreen-avatar-selected"></div>
        </div>
      ))}
      <div
        onClick={() => {
          setEditAvatar(false);
        }}
        className="profileScreen-button profileScreen-button-2 profileScreen-button-3"
      >
        Cancel
      </div>
    </div>
  );
}

export default EditAvatarScreen;
