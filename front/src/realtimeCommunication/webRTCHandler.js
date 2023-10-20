import { setLocalStream } from './videoRoomsSlice';
import store from '../stores/store';

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (localStream) {
    console.log(localStream);
    store.dispatch(setLocalStream(localStream));
  }

  return Boolean(localStream);
};
