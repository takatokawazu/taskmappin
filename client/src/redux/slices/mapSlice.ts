import { createSlice } from '@reduxjs/toolkit';

interface MapState {
  myLocation: null | object;
  onlineUsers: OnlineUser[]; // ここで明示的に OnlineUser[] を指定
  cardChosenOption: null | string;
}

const initialState: MapState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
};

interface OnlineUser {
  userId: string;
  username: string;
  coords: object;
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    removeDisconnectedUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (onlineUser) => onlineUser.userId !== action.payload
      );
    },
    setCardChosenOption: (state, action) => {
      state.cardChosenOption = action.payload;
    },
  },
});

export const { setOnlineUsers, removeDisconnectedUser, setCardChosenOption } =
  mapSlice.actions;

export default mapSlice.reducer;
