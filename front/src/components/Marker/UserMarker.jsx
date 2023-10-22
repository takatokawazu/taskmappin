import React from 'react';
import { useDispatch } from 'react-redux';
import { setCardChosenOption } from '../../redux/slices/mapSlice';
import { Marker } from 'react-map-gl';
import './UserMarker.css';
import myselfImage from '../../resources/icons/myself.png';
import otherUserImage from '../../resources/icons/otherUser.png';

const UserMarker = ({ myself, socketId, username, coords, currentUser }) => {
  const dispatch = useDispatch();

  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          socketId,
          username,
          coords,
        })
      );
    }
  };

  const isCurrentUser = username === currentUser;
  const markerColor = isCurrentUser ? 'red' : 'slateblue';

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
        <div className="border-radius">
          <img
            src={myself ? myselfImage : otherUserImage}
            alt={myself ? 'myself' : 'otherUser'}
            style={{
              width: '25px',
              height: '25px',
              margin: 0,
              verticalAlign: 'bottom',
              cursor: 'pointer',
            }}
          />
          <p className="map_page_marker_text" style={{ color: markerColor }}>
            {myself ? 'Me' : username}
          </p>
        </div>
      </Marker>
    </div>
  );
};

export default UserMarker;
