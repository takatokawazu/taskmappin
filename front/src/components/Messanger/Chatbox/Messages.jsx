import React, { useRef, useEffect } from 'react';
import SingleMessage from './SingleMessage';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const Messages = ({ userId }) => {
  const messages = useSelector((state) => state.messanger.chatHistory[userId]);
  // console.log(messages);
  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {messages?.map((message) => (
        <SingleMessage
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
      <div ref={scrollRef}></div>
    </Box>
  );
};

export default Messages;
