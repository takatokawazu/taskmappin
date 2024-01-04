import { v4 as uuid } from 'uuid';
import store from '../stores/store';
import { addChatMessage, addChatbox } from '../slices/messangerSlice';
import * as socketConn from '../../socketConnection/socketConn';

export const sendChatMessage = (receiverUserId: string, content: string) => {
  const message = {
    content,
    receiverUserId,
    id: uuid(),
  };

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

export const chatMessageHandler = (messageData: { senderUserId: any; content: any; id: any; }) => {
  store.dispatch(
    addChatMessage({
      userId: messageData.senderUserId,
      content: messageData.content,
      meMessage: false,
      id: messageData.id,
    })
  );

  openChatboxIfClosed(messageData.senderUserId);
};

const openChatboxIfClosed = (userId: string) => {
  const chatbox = store
    .getState()
    .messanger.chatboxes.find((c) => c.userId === userId);
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.userId === userId)?.username;

  if (!chatbox) {
    store.dispatch(addChatbox({ userId, username }));
  }
};
