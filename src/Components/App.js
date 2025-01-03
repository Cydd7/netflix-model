import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroScreen from "../Screens/Loader/IntroScreen";
import HomeScreen from "../Screens/Navigation/HomeScreen";
import ProfileScreen from "../Screens/Profile-Manager/ProfileScreen";
import LoginScreen from "../Screens/User/LoginScreen";
import AccountScreen from "../Screens/User/AccountScreen";
import { login, logout, selectUser } from "../Features/userSlice";
import {
  isSubscribed,
  isNotSubscribed,
  selectSubscription,
} from "../Features/subscriptionSlice";
// import { selectMuteStatus } from "../features/muteStatusSlice";
import {
  setAllProfiles,
  // resetAllProfiles,
  // selectAllProfiles,
} from "../Features/allProfilesSlice";
import db from "../Auth/firebase";
import "./App.css";
import { selectActiveProfile } from "../Features/activeProfileSlice";

function App() {
  // user, subscription, allProfiles variable managed by userSlice, subscriptionSlice, allProfilesSlice
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  // const muteStatus = useSelector(selectMuteStatus);
  // const allProfiles = useSelector(selectAllProfiles);
  const activeProfile = useSelector(selectActiveProfile);
  const [introEnded, setIntroEnded] = useState(false);
  // Exporting use dispatch hook to set the variables
  const dispatch = useDispatch();

  //--------------------------------------------------------------------------------------------------------------
  // Setting user
  useEffect(() => {
    onAuthStateChanged(getAuth(), (userAuth) => {
      if (userAuth) {
        //Log in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //Log out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  //--------------------------------------------------------------------------------------------------------------
  // Setting subscription
  // TODO: hint - state of subscription can determine how many profile screens the account will have.
  // TODO: Make this useEffect more efficient by reading firebase docs (Optional)
  useEffect(() => {
    console.log("User: ", user);
    if (user) {
      (async () => {
        const ss = await getDocs(
          collection(db, `customers/${user.uid}/subscriptions`)
        );
        return ss;
      })()
        .then((ss) => {
          console.log(ss);
          ss.docs.length
            ? ss.forEach(async (subscription) => {
                console.log(
                  "Subscription Status :",
                  subscription.data().status
                );
                if (subscription.data().status) {
                  dispatch(isSubscribed({ status: true }));
                } else {
                  dispatch(isNotSubscribed());
                }
              })
            : dispatch(isNotSubscribed());
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + errorMessage);
        });
    }
  }, [user, dispatch]);

  //--------------------------------------------------------------------------------------------------------------
  // Setting profiles

  // TODO: why am I using then, simplify it.
  useEffect(() => {
    if (user) {
      (async () => {
        const ss = await getDocs(
          collection(db, `customers/${user.uid}/allProfiles`)
        );
        return ss;
      })()
        .then((ss) => {
          var a = [];
          ss.docs.length
            ? ss.forEach((profile) => {
                a.push({ ...profile.data(), uid: profile.id });
              })
            : console.log("No profiles added");
          dispatch(setAllProfiles(a));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + errorMessage);
        });
    }
  }, [user, dispatch]);

  // console.log("All Profiles: ", allProfiles);

  //--------------------------------------------------------------------------------------------------------------
  // 1. If there is no user, then only load the LoginScreen.
  // 2. If the user is logged in, then only load the other screens
  // * TODO: If the user is logged in and he/she is subscribed, then only load the HomeScreen.
  return (
    <div className="App">
      <Router>
        {!introEnded && !window.navigator.userAgent.toLowerCase().includes("iphone") ? (
          <IntroScreen setIntroEnded={setIntroEnded} />
        ) : !user ? (
          <LoginScreen />
        ) : !activeProfile ? (
          <ProfileScreen />
        ) : (
          <Routes>
            <Route
              path="/"
              element={subscription ? <HomeScreen /> : <AccountScreen />}
            />
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/manageProfiles" element={<ProfileScreen edit />} />
            <Route path="/intro" element={<IntroScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
