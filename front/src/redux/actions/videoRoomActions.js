import { v4 as uuid } from 'uuid';
import store from '../stores/store';
import { setInRoom, setRooms } from '../slices/videoRoomsSlice';
import * as socketConn from '../../socketConnection/socketConn';
import {
  disconnect,
  getAccessToLocalStream,
  getPeerId,
} from '../../realtimeCommunication/webRTCHandler';

export const createVideoRoom = async () => {
  const success = await getAccessToLocalStream();

  if (success) {
    const newRoomId = uuid();

    store.dispatch(setInRoom(newRoomId));

    socketConn.createVideoRoom({
      peerId: getPeerId(),
      newRoomId,
    });
  }
};

export const joinVideoRoom = async (roomId) => {
  const success = await getAccessToLocalStream();

  if (success) {
    store.dispatch(setInRoom(roomId));

    socketConn.joinVideoRoom({
      roomId,
      peerId: getPeerId(),
    });
  }
};

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};

export const leaveVideoRoom = (roomId) => {
  disconnect();
  socketConn.leaveVideoRoom({
    roomId,
  });

  store.dispatch(setInRoom(false));
};
