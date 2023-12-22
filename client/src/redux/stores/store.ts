import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../slices/mapSlice';
import messagerReducer from '../slices/messangerSlice';
import videoRoomsReducer from '../slices/videoRoomsSlice';
import taskReducer from '../slices/taskSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    messanger: messagerReducer,
    videoRooms: videoRoomsReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'videoRooms/setLocalStream',
          'videoRooms/setRemoteStream',
        ],
        ignoredPaths: ['videoRooms.localStream', 'videoRooms.remoteStream'],
      },
    }),
});

export default store;
