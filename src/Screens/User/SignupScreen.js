import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../Auth/firebase";
import "./SignupScreen.css";

function SignupScreen() {
  const [tooltip, setTooltip] = useState(true);
  const [timeover, setTimeover] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      getAuth(),
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setTimeover(true);
      setTooltip(false);
    }, 3000);
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      getAuth(),
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log("User Info : ", userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  };

  function st(bool) {
    if (timeover) {
      if (bool) {
        setTooltip(true);
      } else {
        setTooltip(false);
      }
    }
  }

  return (
    <div className="signupScreen">
      <form>
        <div
          className={`signupScreen-tooltip ${
            tooltip && "signupScreen-tooltip-show"
          }`}
          onMouseOver={() => {
            st(true);
          }}
          onMouseOut={() => {
            st(false);
          }}
        >
          <b>Guest Login?</b>
          <br />
          User: <span className="red">"test@gmail.com"</span>
          <br />
          Password: <span className="red">"test@123"</span>
          <img src={require("../../Media/dropdown_white.png")} alt="" />
        </div>

        <h1>
          Sign In{" "}
          <span
            onMouseOver={() => {
              st(true);
            }}
            onMouseOut={() => {
              st(false);
            }}
            className="signupScreen-info"
          >
            &#9432;
          </span>
        </h1>
        <input defaultValue="test@gmail.com" ref={emailRef} type="email" placeholder="Email" />
        <input defaultValue="test@123"  ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen-gray">
            New to Netflix?
            <span className="signupScreen-link" onClick={register}>
              {" "}
              Sign up now
            </span>
            .
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
