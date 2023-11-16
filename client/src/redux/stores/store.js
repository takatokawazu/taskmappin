import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../slices/mapSlice';
import messagerReducer from '../slices/messangerSlice';
import taskReducer from '../slices/taskSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    messanger: messagerReducer,
    task: taskReducer,
  },
});

export default store;
