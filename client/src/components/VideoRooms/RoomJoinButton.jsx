import React from 'react';
import { useSelector } from 'react-redux';
import { joinVideoRoom } from '../../redux/actions/videoRoomActions';
import { Button } from '@mui/material';

const RoomJoinButton = ({ creatorUsername, roomId, amountOfParticipants }) => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleJoinRoom = () => {
    if (inRoom) {
      return alert('Already in room');
    }

    if (amountOfParticipants > 1) {
      return alert('Room is full');
    }

    joinVideoRoom(roomId);
  };

  return (
    <Button
      onClick={handleJoinRoom}
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
      {creatorUsername[0]}
    </Button>
  );
};

export default RoomJoinButton;
