import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  isDone: boolean
}

interface TaskState {
  tasks: Task[];
  finishedTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  finishedTasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setTask: (state, action: PayloadAction<Task[]>) => {
      state.finishedTasks = action.payload.filter((task) => task.isDone);
      state.tasks = action.payload.filter((task) => !task.isDone);
    },
    completeTask: (state, action: PayloadAction<Task>) => {
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
