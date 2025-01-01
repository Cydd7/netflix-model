import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: null,
  },
  reducers: {
    isSubscribed: (state, action) => {
      state.subscription = action.payload;
    },
    isNotSubscribed: (state) => {
      state.subscription = false;
    },
  },
});

export const { isSubscribed, isNotSubscribed } = subscriptionSlice.actions;

export const selectSubscription = (state) => state.subscription.subscription;

export default subscriptionSlice.reducer;
