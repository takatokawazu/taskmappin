import React from 'react';
import { useSelector } from 'react-redux';
import { createVideoRoom } from '../../redux/actions/videoRoomActions';
import { Call } from '@mui/icons-material';
import { Button } from '@mui/material';

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const handleRoomCreate = () => {
    if (inRoom) {
      return alert('You are already in the room');
    }

    createVideoRoom();
  };

  return (
    <>
      <Button
        onClick={handleRoomCreate}
        variant="contained"
        color="primary"
        sx={{
          width: '45px',
          height: '45px',
          marginRight: '15px',
          borderRadius: '50px',
          fontSize: '24px',
          transition: '0.3s',
          '&:hover': {
            opacity: 0.6,
          },
          '&:active': {
            backgroundColor: 'black',
          },
        }}
      >
        <Call />
      </Button>
    </>
  );
};

export default CreateRoomButton;
