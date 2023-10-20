import React from 'react';
import callIcon from '../resources/images/call-icon.svg';
import { createVideoRoom } from '../stores/actions/videoRoomActions';

const CreateRoomButton = () => {
  const handleRoomCreate = () => {
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
