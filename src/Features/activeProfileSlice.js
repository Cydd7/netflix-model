import { createSlice } from "@reduxjs/toolkit";

export const activeProfileSlice = createSlice({
  name: "activeProfile",
  initialState: {
    activeProfile: null,
  },
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
    resetActiveProfile: (state) => {
      state.activeProfile = null;
    },
  },
});

export const { setActiveProfile, resetActiveProfile } =
  activeProfileSlice.actions;

export const selectActiveProfile = (state) => state.activeProfile.activeProfile;

export default activeProfileSlice.reducer;
