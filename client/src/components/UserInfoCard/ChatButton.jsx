import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatbox } from '../../redux/slices/messangerSlice';
import { Button } from '@mui/material';
import { createVideoRoom, videoCall } from '../../socketConnection/socketConn';
import {
  getAccessToLocalStream,
  getPeerId,
} from '../../realtimeCommunication/webRTCHandler';
import { v4 as uuid } from 'uuid';
import store from '../../redux/stores/store';
import { setInRoom } from '../../redux/slices/videoRoomsSlice';

const ChatButton = ({ userId, username, setOpen }) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  console.log(onlineUsers);
  const handleAddChatbox = () => {
    dispatch(
      addChatbox({
        username,
        userId,
      })
    );
  };

  const callVideo = async () => {
    const success = await getAccessToLocalStream();

    if (success) {
      const newRoomId = uuid();

      if (onlineUsers.find((user) => user.userId === userId)) {
        onlineUsers.find((user) => {
          // if (user.userId === userId) {
          //   videoCall({
          //     peerId: getPeerId(),
          //     newRoomId,
          //     receiverUserId: userId,
          //     receiverUsername: user.username,
          //   });
          // }
          createVideoRoom({
            peerId: getPeerId(),
            newRoomId,
            // receiverUserId: userId,
            userId,
            receiverUsername: user.username,
          });
          store.dispatch(setInRoom(newRoomId));
        });
      } else {
        // setInputDisabled(true);
        return;
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        onClick={() => {
          setOpen(false);
          handleAddChatbox();
        }}
      >
        chatする
      </Button>
      <Button
        onClick={() => {
          setOpen(false);
          callVideo();
        }}
      >
        電話する
      </Button>
    </div>
  );
};

export default ChatButton;
