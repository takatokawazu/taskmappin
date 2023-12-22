import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  finishedTasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setTask: (state, action) => {
      state.finishedTasks = action.payload.filter((task) => task.isDone);
      state.tasks = action.payload.filter((task) => !task.isDone);
    },
    completeTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
      const completedTask = state.tasks.find(
        (task) => task._id === action.payload._id
      );
      if (completedTask) {
        state.finishedTasks.push(completedTask);
      }
    },
  },
});

export const { addTask, setTask, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
