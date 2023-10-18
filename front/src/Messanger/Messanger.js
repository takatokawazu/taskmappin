import React from 'react';

import './Messanger.css';
import Chatbox from './Chatbox/Chatbox';
import { useSelector } from 'react-redux';

const Messanger = () => {
  const chatboxes = useSelector((state) => state.messanger.chatboxes);

  return (
    <div className="messenger_container">
      {chatboxes.map((chatbox) => (
        <Chatbox
          key={chatbox.socketId}
          socketId={chatbox.socketId}
          username={chatbox.username}
        />
      ))}
    </div>
  );
};

export default Messanger;
