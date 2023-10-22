import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../redux/slices/mapSlice';
import messagerReducer from '../redux/slices/messangerSlice';
import videoRoomsReducer from '../redux/slices/videoRoomsSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    messanger: messagerReducer,
    videoRooms: videoRoomsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          'videoRooms/setLocalStream',
          'videoRooms/setRemoteStream',
        ],
        ignoredPaths: ['videoRooms.localStream', 'videoRooms.remoteStream'],
      },
    }),
});

export default store;
