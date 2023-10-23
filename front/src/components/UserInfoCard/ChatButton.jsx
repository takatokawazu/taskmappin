import React from 'react';
import { useDispatch } from 'react-redux';
import { addChatbox } from '../../redux/slices/messangerSlice';
import { Button } from '@mui/material';

const ChatButton = ({ socketId, username, setOpen }) => {
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
    <Button
      onClick={() => {
        setOpen(false);
        handleAddChatbox();
      }}
    >
      chatする
    </Button>
  );
};

export default ChatButton;
