import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelDataType } from "../types/channel";

export interface ChannelState {
  currentChannel: ChannelDataType;
}

const initialState: ChannelState = {
  currentChannel: {
    id: "",
    name: "",
    detail: "",
  },
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setCurrentChannel(state, action: PayloadAction<ChannelDataType>) {
      state.currentChannel = action.payload;
      return state;
    },
  },
});

export const channelActions = { ...channelSlice.actions };

export default channelSlice.reducer;
