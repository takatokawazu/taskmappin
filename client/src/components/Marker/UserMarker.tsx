import React from 'react';
import { useDispatch } from 'react-redux';
import { setCardChosenOption } from '../../redux/slices/mapSlice';
import { Marker } from 'react-map-gl';
import myselfImage from '../../resources/icons/myself.png';
import otherUserImage from '../../resources/icons/otherUser.png';
import { Box } from '@mui/material';

interface UserMarkerProps {
  myself: boolean;
  userId: string;
  username: string;
  coords: { lat: number; lng: number };
  currentUser: string;
  onMarkerClick: (lat: number, lng: number) => void;
}

const UserMarker: React.FC<UserMarkerProps> = ({
  myself,
  userId,
  username,
  coords,
  currentUser,
  onMarkerClick,
}) => {
  const dispatch = useDispatch();

  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          userId,
          username,
          coords,
        })
      );
    }
  };

  const isCurrentUser = username === currentUser;
  const markerColor = isCurrentUser ? 'red' : 'slateblue';

  return (
    <Box
      sx={{ width: '30px', height: '30px', position: 'relative' }}
      onClick={() => {
        onMarkerClick(coords.lat, coords.lng);
        handleOptionChoose();
      }}
    >
      <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
        <Box
          sx={{
            width: '30px',
            height: '40px',
            lineHeight: '20px',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            '& p': {
              fontSize: '13px',
              color: 'white',
              fontWeight: 700,
              verticalAlign: 'text-top',
              textAlign: 'center',
              margin: 0,
              padding: 0,
            },
          }}
        >
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
          <p style={{ color: markerColor }}>{myself ? 'Me' : username}</p>
        </Box>
      </Marker>
    </Box>
  );
};

export default UserMarker;
