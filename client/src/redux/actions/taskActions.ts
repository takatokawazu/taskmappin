import { setTask } from '../slices/taskSlice';
import store from '../stores/store';
import * as socketConn from '../../socketConnection/socketConn';

export const taskHandler = (data : any) => {
  store.dispatch(setTask(data));
};

export const addTaskHandler = (data : any) => {
  socketConn.addT(data);
};

export const completeTask = (data : any, userId : any) => {
  socketConn.completeT(data, userId);
};
