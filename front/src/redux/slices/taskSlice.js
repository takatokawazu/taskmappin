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
    completeTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.taskId === action.payload.taskId) {
          return action.payload;
        }
        return task;
      });
    },
  },
});

export const { addTask, setTask, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
