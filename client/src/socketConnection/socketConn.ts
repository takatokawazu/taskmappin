import io, { Socket } from 'socket.io-client';
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from '../redux/actions/usersActions';
import { chatMessageHandler } from '../redux/actions/messangerActions';
import {
  videoRoomsListHandler,
} from '../redux/actions/videoRoomActions';
import { call, disconnect } from '../realtimeCommunication/webRTCHandler';
import { taskHandler } from '../redux/actions/taskActions';
import store from '../redux/stores/store';
import { addTask, completeTask } from '../redux/slices/taskSlice';
import toast from 'react-hot-toast';

let socket: Socket | null = null; // Socket型を使用

const ENDPOINT = 'https://taskmappin-c2989267e49d.herokuapp.com';
//
export const connectWithSocketIOServer = () => {
  // socket = io(ENDPOINT);
  socket = io('http://localhost:3003');

  socket.on('connect', () => {
    console.log('connected to socket server');
  });

  socket.on('init', (taskData) => {
    taskHandler(taskData);
  });

  socket.on('add-task', (taskData) => {
    store.dispatch(addTask(taskData));
  });

  socket.on('complete-task', (taskData) => {
    store.dispatch(completeTask(taskData));
  });

  socket.on('online-users', (socketToUserId, usersData) => {
    const socketId = socket?.id;

    if(socketId) {
      onlineUsersHandler(socketToUserId[socketId], usersData);
    }
  });

  socket.on('chat-message', (messageData) => {
    chatMessageHandler(messageData);
  });

  socket.on('video-rooms', (videoRooms) => {
    console.log(videoRooms);
    videoRoomsListHandler(videoRooms);
  });

  socket.on('video-room-init', (data) => {
    call(data);
  });

  socket.on('video-call-disconnect', () => {
    disconnect();
  });

  socket.on('user-disconnected', (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });

  socket.on('taskError', (error) => {
    console.error(error.message);
    toast.error(error.message);
  });
};

export const login = (data : any) => {
  socket?.emit('user-login', data);
};

export const sendChatMessage = (data : any) => {
  socket?.emit('chat-message', data);
};


export const createVideoRoom = (data : any) => {
  socket?.emit('video-room-create', data);
};

export const joinVideoRoom = (data : any) => {
  socket?.emit('video-room-join', data);
};

export const leaveVideoRoom = (data : any) => {
  socket?.emit('video-room-leave', data);
};

export const addT = (data : any) => {
  socket?.emit('add-task', data);
};

export const completeT = (data : any, userId : string) => {
  socket?.emit('complete-task', data, userId);
};
