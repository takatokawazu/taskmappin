import { Box, Typography } from '@mui/material';
import React from 'react';

const SingleMessage = ({ content, myMessage }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: myMessage ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography
        sx={{
          display: 'inline-block',
          p: 1,
          m: 0.5,
          borderRadius: 3,
          fontSize: 14,
          maxWidth: '80%',
          bgcolor: myMessage
            ? '#85e14b'
            : 'rgba(211, 211, 211, 0.9)',
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default SingleMessage;
