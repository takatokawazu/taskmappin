import React from 'react';
import { useDispatch } from 'react-redux';
import { setCardChosenOption } from '../../redux/slices/mapSlice';
import { Marker } from 'react-map-gl';
import { Room } from '@mui/icons-material';

const CustomMarker = ({ myself, socketId, username, coords, currentUser }) => {
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
        <Room
          style={{
            cursor: 'pointer',
            color: markerColor,
          }}
        />
        <p className="map_page_marker_text" style={{ color: markerColor }}>
          {myself ? 'Me' : username}
        </p>
      </Marker>
    </div>
  );
};

export default CustomMarker;
