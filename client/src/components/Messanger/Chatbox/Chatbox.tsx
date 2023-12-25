import React from 'react';
import ChatNavbar from './ChatNavbar';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { Box } from '@mui/material';

const Chatbox = (props : any) => {
  const { userId } = props;

  return (
    <Box
      sx={{
        height: 400,
        width: 300,
        bgcolor: 'white',
        ml: 1.5,
        borderRadius: 2,
        flexDirection: 'column',
        display: 'flex',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <ChatNavbar {...props} />
      <Messages userId={userId} />
      <NewMessage userId={userId} />
    </Box>
  );
};

export default Chatbox;
