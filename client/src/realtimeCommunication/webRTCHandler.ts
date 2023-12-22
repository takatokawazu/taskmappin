import {
  setLocalStream,
  setRemoteStream,
} from '../redux/slices/videoRoomsSlice';
import store from '../redux/stores/store';
import { Peer, MediaConnection } from 'peerjs';

let peer: Peer | undefined;
let peerId: string | undefined;

export const getPeerId = (): string | undefined => {
  return peerId;
};

export const getAccessToLocalStream = async (): Promise<boolean> => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localStream) {
      store.dispatch(setLocalStream(localStream));
    }

    return Boolean(localStream);
  } catch (error) {
    console.error('Error accessing local stream:', error);
    return false;
  }
};

export const connectWithPeerServer = () => {
  const hostName = window.location.hostname;
  const port = 443; // 443;
  // ~~~~~~~~~~~~~~~deploy~~~~~~~~~~~~~~
  // peer = new Peer(undefined, {
  //   host: 'taskmappin-c2989267e49d.herokuapp.com',
  //   port: port,
  //   path: '/myapp',
  // });

  peer = new Peer({
    host: 'localhost',
    port: 9000, // Port should be a number, not a string
    path: '/myapp',
  });

  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    peerId = id;
  });

  peer.on('call', async (call: MediaConnection) => {
    const localStream = store.getState().videoRooms.localStream;

    if (localStream) {
      call.answer(localStream);
      call.on('stream', (remoteStream) => {
        console.log('remote stream came');
        store.dispatch(setRemoteStream(remoteStream));
      });
    }
  });
};

export const call = (data: { newParticipantPeerId: string }) => {
  const { newParticipantPeerId } = data;
  const localStream = store.getState().videoRooms.localStream;

  if (peer && localStream) {
    const peerCall = peer.call(newParticipantPeerId, localStream);

    console.log('localstream!!!!!!!!!!!!');
    peerCall.on('stream', (remoteStream) => {
      console.log('remote stream came');
      store.dispatch(setRemoteStream(remoteStream));
    });
  }
};

export const disconnect = () => {
  const connections : any = peer?.connections || {};

  Object.keys(connections).forEach((connKey: string) => {
    const conn = connections[connKey] as MediaConnection[];

    conn.forEach((c) => {
      console.log('closing connection');
      c.peerConnection.close();

      if (c.close) c.close();
    });
  });

  store.dispatch(setRemoteStream(null));
};
