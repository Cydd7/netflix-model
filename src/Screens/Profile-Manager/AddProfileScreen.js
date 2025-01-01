import { addDoc, query, doc, collection, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Features/userSlice";
import db from "../../Auth/firebase";
import {
  selectAllProfiles,
  setAllProfiles,
} from "../../Features/allProfilesSlice";
import "./AddProfileScreen.css";

function AddProfileScreen({ cancel }) {
  const [logoNo, setLogoNo] = useState(1);
  const [name, setName] = useState("");
  const user = useSelector(selectUser);
  const allprofiles = useSelector(selectAllProfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    setLogoNo(Math.floor(Math.random() * 19) + 1);
  }, []);

  function handleUpdate(e) {
    const name = e.target.value;
    setName(name);
  }

  function submit() {
    const payload = { logoNo: logoNo, name: name };
    var a = allprofiles;
    a = [...a, payload];
    dispatch(setAllProfiles(a));

    const q = query(doc(db, "customers", user.uid));
    (async (q) => {
      const qs = await getDoc(q);

      const ss = await addDoc(collection(qs.ref, "allProfiles"), payload);
      console.log("profile added: ", ss.id);
    })(q).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    });
    cancel();
  }

  return (
    <div className="profileScreen-box-2">
      <div className="profileScreen-title-2">Add Profile</div>
      <span className="profileScreen-span">
        Add a profile for another person watching Netflix.
      </span>
      <div className="profileScreen-info">
        <div className="profileScreen-avatar">
          <img
            src={require(`../../Media/profileLogos/logo${logoNo}.png`)}
            alt=""
          />
        </div>
        <input
          onSubmit={submit}
          onChange={handleUpdate}
          className="enter-name"
          type="text"
          placeholder="Name"
          autoFocus
        />
      </div>
      <span className="button-wrapper">
        <div
          onClick={submit}
          className="profileScreen-button profileScreen-button-2"
        >
          Continue
        </div>
        <div onClick={cancel} className="profileScreen-button">
          Cancel
        </div>
      </span>
    </div>
  );
}

export default AddProfileScreen;
