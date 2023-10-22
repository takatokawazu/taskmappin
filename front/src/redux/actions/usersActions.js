import store from '../stores/store';
import { setOnlineUsers, removeDisconnectedUser } from '../slices/mapSlice';

export const onlineUsersHandler = (socketId, usersData) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user) => {
        if (user.socketId === socketId) {
          user.myself = true;
        }
        return user;
      })
    )
  );
};

export const userDisconnectedHandler = (disconnectedUserSocketId) => {
  store.dispatch(removeDisconnectedUser(disconnectedUserSocketId));
};
