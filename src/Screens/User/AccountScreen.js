import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../../Components/Nav";
import { selectUser } from "../../Features/userSlice";
import PlanScreen from "./PlanScreen";
import "./AccountScreen.css";
import { selectAllProfiles } from "../../Features/allProfilesSlice";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import db from "../../Auth/firebase";

function AccountScreen() {
  const user = useSelector(selectUser);
  const allProfiles = useSelector(selectAllProfiles);
  const [subscription, setSubscription] = useState(null);
  const [products, setProducts] = useState([]);

  const since = new Date(subscription?.current_period_start * 1000);

  useEffect(() => {
    const q = query(doc(db, "customers", user.uid));

    (async function abc(q) {
      const qs = await getDoc(q);
      const ss = await getDocs(collection(qs.ref, "subscriptions"));
      return ss;
    })(q).then((ss) => {
      ss.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  console.log("subs ", subscription);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const qa = query(q, where("active", "==", true));
    // console.log(qa);

    async function abc(qa) {
      const qSnapshot = await getDocs(qa);
      //   console.log(qSnapshot);
      return qSnapshot;
    }

    async function abc2(qs) {
      const products = {};
      qs.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });

      setProducts(products);
    }

    abc(qa).then((qs) => abc2(qs));
  }, []);

  console.log("pro: ", products);

  return (
    <div className="AccountScreen">
      <Nav black />
      <div className="AccountScreen-header">
        <h1>Account</h1>
        <img src={require("../../Media/membersince.png")} alt="" />
        {subscription && (
          <p>
            Member since {since.toLocaleString("default", { month: "long" })}{" "}
            {since.getFullYear()}
          </p>
        )}
      </div>
      <div className="AccountScreen-body">
        <div className="AccountScreen-block">
          <div className="AccountScreen-block-title">MEMBERSHIP & BILLING</div>
          <div className="AccountScreen-block-info AccountScreen-mail">
            {user.email}
          </div>
        </div>
        <div className="AccountScreen-block">
          <div className="AccountScreen-block-title">PLAN DETAILS</div>

          <div className="AccountScreen-block-info">
            <div className="AccountScreen-plans">
              <PlanScreen subscription={subscription} products={products} />
            </div>
          </div>
        </div>
        <div className="AccountScreen-block">
          <div className="AccountScreen-block-title">PROFILES</div>

          <div className="AccountScreen-block-info">
            {allProfiles.map((profile) => (
              <div className="AccountScreen-profiles-wrapper">
                <img
                  className="AccountScreen-profiles-img"
                  src={require(`../../Media/profileLogos/logo${profile.logoNo}.png`)}
                  alt=""
                />
                <span key={profile.uid}>{profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountScreen;
