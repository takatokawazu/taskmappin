import React from 'react';
import { useSelector } from 'react-redux';
import CreateRoomButton from './CreateRoomButton';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos from './ParticipantsVideos';
import { convertRoomsToArray } from '../../utils/convertRoomsToArray';
import { Box } from '@mui/material';

const VideoRooms = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          bottom: '25px',
          right: '45px',
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <CreateRoomButton />
        {convertRoomsToArray(rooms).map((room, index) => (
          <RoomJoinButton
            key={index}
            creatorUsername={room.creatorUsername}
            roomId={room.id}
            amountOfParticipants={room.amountOfParticipants}
          />
        ))}
      </Box>
      <ParticipantsVideos />
    </>
  );
};

export default VideoRooms;
