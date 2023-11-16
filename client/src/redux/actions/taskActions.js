import { setTask } from '../slices/taskSlice';
import store from '../stores/store';
import * as socketConn from '../../socketConnection/socketConnection';

export const taskHandler = (data) => {
  store.dispatch(setTask(data));
};

export const addTaskHandler = (data) => {
  socketConn.addT(data);
};

export const completeTask = (data, userId) => {
  socketConn.completeT(data, userId);
};
