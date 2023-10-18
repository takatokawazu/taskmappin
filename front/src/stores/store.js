import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../MapPage/mapSlice';
import messagerReducer from '../Messanger/MessagerSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    messanger: messagerReducer,
  },
});

export default store;
