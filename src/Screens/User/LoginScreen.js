import React, { useState } from "react";
import SignupScreen from "./SignupScreen";
import "./LoginScreen.css";

function LoginScreen() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");

  function handleUpdate(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="loginScreen">
      <div className="loginScreen-background">
        <img
          src={require("../../Media/net_logo.png")}
          alt="NETFLIX"
          className="loginScreen-Logo"
        ></img>

        <button onClick={() => setSignIn(true)} className="loginScreen-button">
          Sign In
        </button>

        <div className="loginScreen-gradient" />
      </div>

      <div className="loginScreen-body">
        {/* Hot Swapping signupScreen with starting text */}
        {signIn ? (
          <SignupScreen email={email} />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen-input">
              <form>
                <input
                  onChange={handleUpdate}
                  value={email}
                  autoFocus
                  type="email"
                  placeholder="Email address"
                />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen-getStarted"
                >
                  GET STARTED &gt;
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
