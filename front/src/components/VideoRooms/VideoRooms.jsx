import React from 'react';
import { useSelector } from 'react-redux';
import CreateRoomButton from './CreateRoomButton';
import RoomJoinButton from './RoomJoinButton';
import ParticipantsVideos from './ParticipantsVideos';
import { convertRoomsToArray } from '../../utils/convertRoomsToArray';

const VideoRooms = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);
  return (
    <>
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
      <ParticipantsVideos />
    </>
  );
};

export default VideoRooms;
