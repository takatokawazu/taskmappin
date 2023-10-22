import React, { useState } from 'react';
import { sendChatMessage } from '../../../redux/actions/messangerActions';
import { useSelector } from 'react-redux';

const NewMessage = ({ socketId }) => {
  const [message, setMessage] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleMessageValueChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPressed = (e) => {
    if (e.code === 'Enter' && message.length > 0) {
      proceedChatMessage();
      setMessage('');
    }
  };

  const proceedChatMessage = () => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message);
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        className="chatbox_new_message_input"
        type="text"
        placeholder="Type your message ..."
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
        disabled={inputDisabled}
      />
    </div>
  );
};

export default NewMessage;
