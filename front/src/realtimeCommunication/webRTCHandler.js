import {
  setLocalStream,
  setRemoteStream,
} from '../redux/slices/videoRoomsSlice';
import store from '../redux/stores/store';
import { Peer } from 'peerjs';

let peer;
let peerId;

export const getPeerId = () => {
  return peerId;
};

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (localStream) {
    store.dispatch(setLocalStream(localStream));
  }

  return Boolean(localStream);
};

export const connectWithPeerServer = () => {
  peer = new Peer(undefined, {
    host: 'localhost',
    port: 9000,
    path: '/peer',
  });

  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    peerId = id;
  });

  peer.on('call', async (call) => {
    const localStream = store.getState().videoRooms.localStream;
    call.answer(localStream);
    call.on('stream', (remoteStream) => {
      console.log('remote stream came');
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

export const call = (data) => {
  const { newParticipantPeerId } = data;
  const localStream = store.getState().videoRooms.localStream;

  const peerCall = peer.call(newParticipantPeerId, localStream);

  peerCall.on('stream', (remoteStream) => {
    console.log('remote stream came');
    store.dispatch(setRemoteStream(remoteStream));
  });
};

export const disconnect = () => {
  for (let conns in peer.connections) {
    peer.connections[conns].forEach((c) => {
      console.log('closing connection');
      c.peerConnection.close();

      if (c.close) c.close();
    });
  }

  store.dispatch(setRemoteStream(null));
};
