import React from 'react';
import { useDispatch } from 'react-redux';
import chatIcon from '../../resources/images/chat-icon.svg';
import { addChatbox } from '../../redux/slices/messangerSlice';

const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();
  const handleAddChatbox = () => {
    dispatch(
      addChatbox({
        username,
        socketId,
      })
    );
  };

  return (
    <img
      src={chatIcon}
      className="map_page_card_img"
      onClick={handleAddChatbox}
      alt={chatIcon}
    />
  );
};

export default ChatButton;
