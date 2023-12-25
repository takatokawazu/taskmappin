import store from '../stores/store';
import { setOnlineUsers, removeDisconnectedUser } from '../slices/mapSlice';


interface UserInfo {
  myself: boolean;
  userId: string;
  callerUserId: string,
  callerSocketId: string,
  username: string,
  peerId : string,
  newRoomId : string,
}

export const onlineUsersHandler = (userId : string, usersData : UserInfo[]) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user) => {
        if (user.userId === userId) {
          user.myself = true;
        }
        return user;
      })
    )
  );
};

export const userDisconnectedHandler = (disconnectedUserSocketId : string) => {
  store.dispatch(removeDisconnectedUser(disconnectedUserSocketId));
};
