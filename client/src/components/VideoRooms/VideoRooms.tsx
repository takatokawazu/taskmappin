import React from 'react';
import { useSelector } from 'react-redux';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos from './ParticipantsVideos';
import { Box } from '@mui/material';

const VideoRooms = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          width: '100%',
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
