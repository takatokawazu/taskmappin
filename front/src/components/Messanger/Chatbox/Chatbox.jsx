import React from 'react';
import ChatNavbar from './ChatNavbar';
import Messages from './Messages';
import NewMessage from './NewMessage';

const Chatbox = (props) => {
  const { socketId } = props;
  return (
    <div className="chatbox_container">
      <ChatNavbar {...props} />
      <Messages socketId={socketId} />
      <NewMessage socketId={socketId} />
    </div>
  );
};

export default Chatbox;
