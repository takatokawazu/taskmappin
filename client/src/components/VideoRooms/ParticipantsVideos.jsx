import React from 'react';
import { useSelector } from 'react-redux';
import Video from './Video';
import VideoRoomButtons from './VideoRoomButtons';
import { Box } from '@mui/material';

const ParticipantsVideos = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const localStream = useSelector((state) => state.videoRooms.localStream);
  const remoteStream = useSelector((state) => state.videoRooms.remoteStream);

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column-reverse',
        right: '10px',
        bottom: '30px',
        width: '250px',
        alignItems: 'flex-end',
      }}
    >
      {inRoom && <VideoRoomButtons inRoom={inRoom} />}
      {inRoom && localStream && <Video stream={localStream} muted />}
      {inRoom && remoteStream && <Video stream={remoteStream} muted />}
    </Box>
  );
};

export default ParticipantsVideos;
