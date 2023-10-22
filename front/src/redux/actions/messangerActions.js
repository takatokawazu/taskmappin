import { v4 as uuid } from 'uuid';
import store from '../stores/store';
import { addChatMessage, addChatbox } from '../slices/MessagerSlice';
import * as socketConn from '../../socketConnection/socketConn';

export const sendChatMessage = (receiverSocketId, content) => {
  const message = {
    content,
    receiverSocketId,
    id: uuid(),
  };

  // socektConnection
  socketConn.sendChatMessage(message);

  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      meMessage: false,
      id: messageData.id,
    })
  );

  openChatboxIfClosed(messageData.senderSocketId);
};

const openChatboxIfClosed = (socketId) => {
  const chatbox = store
    .getState()
    .messanger.chatboxes.find((c) => c.socketId === socketId);
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;

  if (!chatbox) {
    store.dispatch(addChatbox({ socketId, username }));
  }
};
