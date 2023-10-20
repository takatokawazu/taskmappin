import React from 'react';

const RoomJoinButton = ({ creatorUsername, roomId, amountOfParticipants }) => {
  const handleJoinRoom = () => {};

  return (
    <button onClick={handleJoinRoom} className="map_page_v_rooms_join_button">
      {creatorUsername[0]}
    </button>
  );
};

export default RoomJoinButton;
