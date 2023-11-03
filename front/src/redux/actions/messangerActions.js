import { v4 as uuid } from 'uuid';
import store from '../stores/store';
import { addChatMessage, addChatbox } from '../slices/messangerSlice';
import * as socketConn from '../../socketConnection/socketConn';

export const sendChatMessage = (receiverUserId, content) => {
  const message = {
    content,
    receiverUserId,
    id: uuid(),
  };

  console.log(message);

  socketConn.sendChatMessage(message);

  store.dispatch(
    addChatMessage({
      userId: receiverUserId,
      content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      userId: messageData.senderSocketId,
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
