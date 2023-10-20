import React from 'react';
import { useSelector } from 'react-redux';
import CreateRoomButton from './CreateRoomButton';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos from './ParticipantsVideos';

const convertRoomsToArray = (videoRooms) => {
  const rooms = [];

  Object.entries(videoRooms).forEach(([key, value]) => {
    rooms.push({
      id: key,
      creatorUsername: value.participants[0].username,
      amountOfParticipants: value.participants.length,
    });
  });

  return rooms;
};

const RoomsList = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);

  return (
    <div className="map_page_v_rooms_list">
      <CreateRoomButton />
      {convertRoomsToArray(rooms).map((room) => (
        <RoomJoinButton
          key={room.id}
          creatorUsername={room.creatorUsername}
          roomId={room.id}
          amountOfParticipants={room.amountOfParticipants}
        />
      ))}
    </div>
  );
};

const VideoRooms = () => {
  return (
    <>
      <RoomsList />
      <ParticipantsVideos />
    </>
  );
};

export default VideoRooms;
