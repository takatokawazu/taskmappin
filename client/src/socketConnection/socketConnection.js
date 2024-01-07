import io from 'socket.io-client';
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from '../redux/actions/usersActions';
import { chatMessageHandler } from '../redux/actions/messangerActions';
import { taskHandler } from '../redux/actions/taskActions';
import store from '../redux/stores/store';
import { addTask, completeTask } from '../redux/slices/taskSlice';
import toast from 'react-hot-toast';
let socket = null;

const ENDPOINT = 'https://taskmappin-c2989267e49d.herokuapp.com';
// const ENDPOINT = 'http://localhost:3003';

export const connectWithSocketIOServer = () => {
  socket = io(ENDPOINT);

  socket.on('connect', () => {
    console.log('connected to socket server');
  });

  socket.on('get-task', (taskData) => {
    taskHandler(taskData);
  });

  socket.on('add-task', (taskData) => {
    store.dispatch(addTask(taskData));
  });

  socket.on('complete-task', (taskData) => {
    store.dispatch(completeTask(taskData));
  });

  socket.on('online-users', (socketToUserId, usersData) => {
    onlineUsersHandler(socketToUserId[socket.id], usersData);
  });

  socket.on('chat-message', (messageData) => {
    chatMessageHandler(messageData);
  });

  socket.on('user-disconnected', (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });

  socket.on('taskError', (error) => {
    console.error(error.message);
    toast.error(error.message);
  });
};

export const login = (data) => {
  socket.emit('user-login', data);
};

export const sendChatMessage = (data) => {
  socket.emit('chat-message', data);
};

export const addT = (data) => {
  socket.emit('add-task', data);
};

export const completeT = (data, userId) => {
  socket.emit('complete-task', data, userId);
};
