import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../MapPage/mapSlice';
import messagerReducer from '../Messanger/MessagerSlice';
import videoRoomsReducer from '../realtimeCommunication/videoRoomsSlice';

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
