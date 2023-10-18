import React from 'react';
import Navbar from './Navbar';
import Messages from './Messages';
import NewMessage from './NewMessage';

const Chatbox = (props) => {
  const { socketId } = props;
  console.log(socketId);
  return (
    <div className="chatbox_container">
      <Navbar {...props} />
      <Messages socketId={socketId} />
      <NewMessage socketId={socketId} />
    </div>
  );
};

export default Chatbox;
