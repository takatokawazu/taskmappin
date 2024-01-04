import React from 'react'
import { Button } from '@mui/material';
import { createVideoRoom } from '../../socketConnection/socketConn';
import {
  getAccessToLocalStream,
  getPeerId,
} from '../../realtimeCommunication/webRTCHandler';
import { v4 as uuid } from 'uuid';
import store from '../../redux/stores/store';
import { setInRoom } from '../../redux/slices/videoRoomsSlice';
import { useSelector } from 'react-redux';

const CallButton = ({ userId, setOpen }: {
  userId: any,
  setOpen: any
}) => {
  const onlineUsers = useSelector((state) => state.map.onlineUsers);


  const callVideo = async () => {
    const success = await getAccessToLocalStream();

    if (success) {
      const newRoomId = uuid();

      if (onlineUsers.find((user) => user.userId === userId)) {
        onlineUsers.find((user) => {
          createVideoRoom({
            peerId: getPeerId(),
            newRoomId,
            userId,
            receiverUsername: user.username,
          });
          store.dispatch(setInRoom(newRoomId));
        });
      } else {
        alert("User not found!")
        return;
      }
    }
  };

  return (
    <Button
        onClick={() => {
          setOpen(false);
          callVideo();
        }}
      >
        電話する
      </Button>
  )
}

export default CallButton
