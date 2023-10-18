import React from 'react';
import SingleMessage from './SingleMessage';
import { useSelector } from 'react-redux';

const Messages = ({ socketId }) => {
  const messages = useSelector(
    (state) => state.messanger.chatHistory[socketId]
  );

  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  return (
    <div className="chatbox_messages_container">
      {messages?.map((message) => (
        <SingleMessage
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
    </div>
  );
};

export default Messages;
