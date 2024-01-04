import React from 'react';

import Chatbox from './Chatbox/Chatbox';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from '@/redux/stores/store';

const Messanger = () => {
  const chatboxes = useSelector((state: RootState) => state.messanger.chatboxes);
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
      {chatboxes.map((chatbox, index) => (
        <Chatbox
          key={index}
          userId={chatbox.userId}
          username={chatbox.username}
        />
      ))}
    </Box>
  );
};

export default Messanger;
