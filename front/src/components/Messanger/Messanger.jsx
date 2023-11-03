import React from 'react';

import Chatbox from './Chatbox/Chatbox';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const Messanger = () => {
  const chatboxes = useSelector((state) => state.messanger.chatboxes);
  console.log(chatboxes);
  return (
    <Box
      sx={{
        height: 400,
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
      }}
    >
      {chatboxes.map((chatbox) => (
        <Chatbox
          key={chatbox.userId}
          socketId={chatbox.userId}
          username={chatbox.username}
        />
      ))}
    </Box>
  );
};

export default Messanger;
