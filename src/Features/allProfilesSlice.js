import { createSlice } from "@reduxjs/toolkit";

export const allProfilesSlice = createSlice({
  name: "allProfiles",
  initialState: {
    allProfiles: [],
  },
  reducers: {
    setAllProfiles: (state, action) => {
      state.allProfiles = action.payload;
    },
    resetAllProfiles: (state) => {
      state.allProfiles = null;
    },
  },
});

export const { setAllProfiles, resetAllProfiles } = allProfilesSlice.actions;

export const selectAllProfiles = (state) => state.allProfiles.allProfiles;

export default allProfilesSlice.reducer;
