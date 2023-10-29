import React, { useState } from 'react';
import { sendChatMessage } from '../../../redux/actions/messangerActions';
import { useSelector } from 'react-redux';
import { Box, TextField } from '@mui/material';

const NewMessage = ({ socketId }) => {
  const [message, setMessage] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleMessageValueChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    proceedChatMessage();
    setMessage('');
  };

  const proceedChatMessage = () => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message);
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '40px',
        borderTop: '1px solid #e5e5e5',
      }}
    >
      <form
        style={{ height: '40px', width: '100%' }}
        onSubmit={handleSendMessage}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message ..."
          value={message}
          onChange={handleMessageValueChange}
          disabled={inputDisabled}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& input': {
              height: '40px',
              padding: '0px',
            },
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
          InputProps={{
            sx: {
              height: '40px',
            },
          }}
        />
      </form>
    </Box>
  );
};

export default NewMessage;
