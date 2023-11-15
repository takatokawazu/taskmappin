import React from 'react';
import { useSelector } from 'react-redux';
import { joinVideoRoom } from '../../redux/actions/videoRoomActions';
import { Button } from '@mui/material';

const RoomJoinButton = ({ creatorUsername, roomId, userId }) => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleJoinRoom = () => {
    if (inRoom) {
      return alert('Already in room');
    }

    joinVideoRoom(roomId, userId);
  };

  return (
    <Button
      onClick={handleJoinRoom}
      variant="contained"
      color="success"
      sx={{
        width: '200px',
        height: '45px',
        fontSize: '12px',
        transition: '0.3s',
        '&:hover': {
          opacity: 0.6,
        },
        '&:active': {
          backgroundColor: 'black',
        },
      }}
    >
      {creatorUsername}が電話をしています
    </Button>
  );
};

export default RoomJoinButton;
