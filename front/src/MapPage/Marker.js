import React from 'react';
import { useDispatch } from 'react-redux';
import { setCardChosenOption } from './mapSlice';
import { Marker } from 'react-map-gl';
import { Room } from '@mui/icons-material';
const CustomMarker = (props) => {
  const { myself, socketId, username, coords, currentUser } = props;
  const dispatch = useDispatch();

  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          socketId: socketId,
          username: username,
          coords: coords,
        })
      );
    }
  };

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      {/* {username !== currentUser && ( */}
      <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
        <Room
          style={{
            cursor: 'pointer',
            color: 'slateblue',
          }}
        />
        <p className="map_page_marker_text" style={{ color: 'slateblue' }}>
          {myself ? 'Me' : username}
        </p>
      </Marker>
    </div>
  );
};

export default CustomMarker;
