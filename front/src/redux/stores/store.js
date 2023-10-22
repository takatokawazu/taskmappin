import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../slices/mapSlice';
import messagerReducer from '../slices/MessagerSlice';
import videoRoomsReducer from '../slices/videoRoomsSlice';

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
