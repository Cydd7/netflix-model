import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import Nav from "../../Components/Nav";
import { selectUser } from "../../Features/userSlice";
import PlanScreen from "./PlanScreen";
import "./AccountScreen.css";
import {
  resetActiveProfile,
  selectActiveProfile,
} from "../../Features/activeProfileSlice";

function AccountScreen() {
  const user = useSelector(selectUser);
  const activeProfile = useSelector(selectActiveProfile);
  const dispatch = useDispatch();

  return (
    <div className="AccountScreen">
      <Nav black />
      <div className="AccountScreen-body">
        <h1>Account</h1>
        <div className="AccountScreen-info">
          <img
            src={require(`../../Media/profileLogos/logo${activeProfile.logoNo}.png`)}
            alt="Avatar"
          />
          <div className="AccountScreen-details">
            <h2>{user.email}</h2>

            <div className="AccountScreen-plans">
              <h3>Plans</h3>
              <PlanScreen />
              <button
                onClick={() => {
                  dispatch(resetActiveProfile());
                  signOut(getAuth());
                }}
                className="AccountScreen-signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountScreen;
