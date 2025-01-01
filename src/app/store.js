import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import subscriptionReducer from "../Features/subscriptionSlice";
import activeProfileReducer from "../Features/activeProfileSlice";
import allProfilesReducer from "../Features/allProfilesSlice";
import muteStatusReducer from "../Features/muteStatusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
    activeProfile: activeProfileReducer,
    allProfiles: allProfilesReducer,
    muteStatus: muteStatusReducer,
  },
});
