import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../../resources/images/close-icon.svg';
import { removeChatbox } from '../../../redux/slices/messangerSlice';
import { Box, Typography } from '@mui/material';
import { RootState } from '@/redux/stores/store'; // このimport文はReduxの設定に基づきます


interface UserMarkerProps {
  myself: boolean;
  userId: string;
  username: string;
  coords: { lat: number; lng: number };
  currentUser: string;
  onMarkerClick: (lat: number, lng: number) => void;
}

const ChatNavbar : React.FC<UserMarkerProps> = ({ username, userId }) => {
  const onlineUsers = useSelector((state : RootState) => state.map.onlineUsers);

  const dispatch = useDispatch();
  const handleCloseChatbox = () => {
    dispatch(removeChatbox(userId));
  };

  useEffect(() => {
    if (onlineUsers.find((user) => user.userId === userId)) {
    } else {
      handleCloseChatbox();
    }
  }, [onlineUsers]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 40,
        bgcolor: '#1976d2',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {username}
      </Typography>
      <Box
        sx={{
          width: 20,
          height: 20,
          position: 'absolute',
          right: 1,
        }}
      >
        <img
          alt="close"
          src={closeIcon}
          style={{
            width: '100%',
            height: '100%',
          }}
          onClick={handleCloseChatbox}
        />
      </Box>
    </Box>
  );
};

export default ChatNavbar;
