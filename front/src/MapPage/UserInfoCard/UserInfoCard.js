import React from 'react';
import { useSelector } from 'react-redux';
import { calulateDistanceBetweenCoords } from '../../utils/location';
import ActionButton from './ActionButton';

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};

const UserInfoCard = ({ username, userLocation, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);

  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px" />
      <Label
        text={`${calulateDistanceBetweenCoords(myLocation, userLocation)}km`}
        fontSize="16px"
      />
      <ActionButton socketId={socketId} username={username} />
    </div>
  );
};

export default UserInfoCard;
