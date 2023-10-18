import { v4 as uuid } from 'uuid';
import store from '../store';
import { addChatMessage } from '../../Messanger/MessagerSlice';

export const sendChatMessage = (receiverSocketId, content) => {
  const message = {
    content,
    receiverSocketId,
    id: uuid(),
  };

  // socektConnection
  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    })
  );
};
