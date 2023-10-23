import React from 'react';
import { calulateDistanceBetweenCoords } from '../../utils/location';
import ChatButton from './ChatButton';

const UserInfoCard = ({
  username,
  userLocation,
  socketId,
  currentUserPosition,
}) => {
  return (
    <div className="map_page_card_container">
      <p className="map_page_card_label" style={{ fontSize: '16px' }}>
        {username}
      </p>
      <p className="map_page_card_label" style={{ fontSize: '16px' }}>
        {`${calulateDistanceBetweenCoords(
          currentUserPosition,
          userLocation
        )}km`}
      </p>
      <div className="map_page_card_buttons_container">
        <ChatButton socketId={socketId} username={username} />
      </div>
    </div>
  );
};

export default UserInfoCard;
