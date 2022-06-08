import { createSlice } from "@reduxjs/toolkit";

export const muteStatusSlice = createSlice({
  name: "muteStatus",
  initialState: {
    muteStatus: null,
  },
  reducers: {
    mute: (state) => {
      state.muteStatus = true;
    },
    unmute: (state) => {
      state.muteStatus = false;
    },
  },
});

export const { mute, unmute } = muteStatusSlice.actions;

export const selectMuteStatus = (state) => state.muteStatus.muteStatus;

export default muteStatusSlice.reducer;
