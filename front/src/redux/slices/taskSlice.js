import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, setTask } = taskSlice.actions;

export default taskSlice.reducer;
