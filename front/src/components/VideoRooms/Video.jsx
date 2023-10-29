import { Box } from '@mui/material';
import React, { useRef, useEffect } from 'react';

const Video = ({ stream, muted }) => {
  const videoEl = useRef();

  useEffect(() => {
    const video = videoEl.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <Box
      sx={{
        height: '200px',
        width: '250px',
        backgroundColor: 'black',
        marginBottom: '10px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        ref={videoEl}
        width="98%"
        height="98%"
        playsInline
        autoPlay
        muted={muted}
      />
    </Box>
  );
};

export default Video;
