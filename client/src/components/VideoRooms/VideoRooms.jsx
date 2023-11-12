import React from 'react';
import { useSelector } from 'react-redux';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos from './ParticipantsVideos';
import { Box } from '@mui/material';

const VideoRooms = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);
  console.log(rooms);

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '25px',
          right: '45px',
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        {Object.keys(rooms).length !== 0 && (
          <RoomJoinButton
            key={rooms.newRoomId}
            creatorUsername={rooms.username}
            roomId={rooms.newRoomId}
            userId={rooms.callerUserId}
          />
        )}
      </Box>
      <ParticipantsVideos />
    </>
  );
};

export default VideoRooms;
