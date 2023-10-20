import React from 'react';
import { useSelector } from 'react-redux';
import callIcon from '../resources/images/call-icon.svg';
import { createVideoRoom } from '../stores/actions/videoRoomActions';

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleRoomCreate = () => {
    if (inRoom) {
      return alert('You are already in the room');
    }

    createVideoRoom();
  };

  return (
    <img
      className="map_page_card_img"
      src={callIcon}
      onClick={handleRoomCreate}
    ></img>
  );
};

export default CreateRoomButton;
