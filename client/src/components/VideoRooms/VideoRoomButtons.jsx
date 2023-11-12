import React from 'react';
import disconnectIcon from '../../resources/images/call-disconnect-icon.svg';
import micIcon from '../../resources/images/mic-icon.svg';
import micOffIcon from '../../resources/images/mic-off-icon.svg';
import cameraIcon from '../../resources/images/camera-icon.svg';
import cameraOffIcon from '../../resources/images/camera-off-icon.svg';
import { leaveVideoRoom } from '../../redux/actions/videoRoomActions';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInRoom,
  setIsCameraOn,
  setIsMicOn,
  setLocalStream,
  setRooms,
} from '../../redux/slices/videoRoomsSlice';
import { Box, Button } from '@mui/material';

const VideoRoomButtons = ({ inRoom }) => {
  const isMicOn = useSelector((state) => state.videoRooms.isMicOn);
  const isCameraOn = useSelector((state) => state.videoRooms.isCameraOn);
  const localStream = useSelector((state) => state.videoRooms.localStream);

  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });

      dispatch(setLocalStream(null));
      // dispatch(setRooms({}));
    }
    console.log(inRoom);
    leaveVideoRoom(inRoom);
  };

  const handleMuteUnmuteChange = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setIsMicOn(!isMicOn));
  };

  const handleCameraOnOffChange = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setIsCameraOn(!isCameraOn));
  };

  return (
    <Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}
    >
      <Button
        onClick={handleMuteUnmuteChange}
        variant="contained"
        color="primary"
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          fontSize: '16px',
          border: 'none',
          transition: '0.3s',
          '&:hover': {
            opacity: 0.6,
          },
        }}
      >
        <img src={isMicOn ? micIcon : micOffIcon} width="25px" height="25px" />
      </Button>
      <Button
        onClick={handleLeaveRoom}
        variant="contained"
        color="primary"
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          fontSize: '16px',
          border: 'none',
          transition: '0.3s',
          '&:hover': {
            opacity: 0.6,
          },
        }}
      >
        <img src={disconnectIcon} width="25px" height="25px" />
      </Button>
      <Button
        onClick={handleCameraOnOffChange}
        variant="contained"
        color="primary"
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          fontSize: '16px',
          border: 'none',
          transition: '0.3s',
          '&:hover': {
            opacity: 0.6,
          },
        }}
      >
        <img
          src={isCameraOn ? cameraIcon : cameraOffIcon}
          width="25px"
          height="25px"
        />
      </Button>
    </Box>
  );
};

export default VideoRoomButtons;
