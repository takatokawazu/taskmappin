import React, { useState } from 'react';
import { sendChatMessage } from '../../../redux/actions/messangerActions';
import { useSelector } from 'react-redux';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const NewMessage = ({ userId }) => {
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
    if (onlineUsers.find((user) => user.userId === userId)) {
      sendChatMessage(userId, message);
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
        style={{ height: '40px', width: '100%', alignItems: 'center', display: "flex" }}
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
            width: '90%',
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          aria-label="Send"
        >
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default NewMessage;
