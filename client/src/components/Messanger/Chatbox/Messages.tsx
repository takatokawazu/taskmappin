import React, { useRef, useEffect } from 'react';
import SingleMessage from './SingleMessage';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { RootState } from '@/redux/stores/store';

interface Message {
  content: string;
  myMessage: boolean;
}

interface UserMarkerProps {
  myself: boolean;
  userId: string;
  username: string;
  coords: { lat: number; lng: number };
  currentUser: string;
  onMarkerClick: (lat: number, lng: number) => void;
}

const Messages : React.FC<UserMarkerProps> = ({ userId }) => {
  const messages : Message[] = useSelector((state : RootState) => state.messanger.chatHistory[userId]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
      {messages?.map((message, index) => (
        <SingleMessage
          key={index}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
      <div ref={scrollRef}></div>
    </Box>
  );
};

export default Messages;
