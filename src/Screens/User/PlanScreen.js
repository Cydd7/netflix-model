import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/userSlice";
import db from "../../Auth/firebase";
import "./PlanScreen.css";

function PlanScreen({ subscription, products }) {
  const user = useSelector(selectUser);

  // TODO: Only one subs should be there. Status 'active=true' should be there for only one. Not working make it work

  // Getting subscription info and updating it in subscription hook.

  // useEffect(() => {
  //   const q = query(doc(db, "customers", user.uid));

  //   (async function abc(q) {
  //     const qs = await getDoc(q);
  //     const ss = await getDocs(collection(qs.ref, "subscriptions"));
  //     return ss;
  //   })(q).then((ss) => {
  //     ss.forEach(async (subscription) => {
  //       setSubscription({
  //         role: subscription.data().role,
  //         current_period_end: subscription.data().current_period_end.seconds,
  //         current_period_start:
  //           subscription.data().current_period_start.seconds,
  //       });
  //     });
  //   });
  // }, [user.uid]);

  // console.log("subs ", subscription);

  // useEffect(() => {
  //   const q = query(collection(db, "products"));
  //   const qa = query(q, where("active", "==", true));
  //   // console.log(qa);

  //   async function abc(qa) {
  //     const qSnapshot = await getDocs(qa);
  //     //   console.log(qSnapshot);
  //     return qSnapshot;
  //   }

  //   async function abc2(qs) {
  //     const products = {};
  //     qs.forEach(async (productDoc) => {
  //       products[productDoc.id] = productDoc.data();
  //       const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

  //       priceSnap.docs.forEach((price) => {
  //         products[productDoc.id].prices = {
  //           priceId: price.id,
  //           priceData: price.data(),
  //         };
  //       });
  //     });

  //     setProducts(products);
  //   }

  //   abc(qa).then((qs) => abc2(qs));
  // }, []);

  // console.log("pro: ", products);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(doc(db, "customers", user.uid), "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="PlanScreen">
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData?.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());
        // console.log(isCurrentPackage, productData.name, subscription.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen-plan-disabled"
            } planScreen-plan`}
          >
            <div className="planScrren-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
