import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inRoom: null,
  rooms: [],
  localStream: null,
  remoteStream: null,
};

export const videoRoomsSlice = createSlice({
  name: 'videoRooms',
  initialState,
  reducers: {
    setInRoom: (state, action) => {
      state.inRoom = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
  },
});

export const { setInRoom, setRooms, setLocalStream, setRemoteStream } =
  videoRoomsSlice.actions;

export default videoRoomsSlice.reducer;
