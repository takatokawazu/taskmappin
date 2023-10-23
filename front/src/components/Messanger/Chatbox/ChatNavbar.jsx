import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../../resources/images/close-icon.svg';
import { removeChatbox } from '../../../redux/slices/messangerSlice';

const Navbar = ({ username, socketId }) => {
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const dispatch = useDispatch();
  const handleCloseChatbox = () => {
    dispatch(removeChatbox(socketId));
  };

  useEffect(() => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
    } else {
      handleCloseChatbox();
    }
  }, [onlineUsers]);

  return (
    <div className="chatbox_nav_bar_container">
      <p className="chatbox_nav_bar_label">{username}</p>
      <div className="chatbox_close_icon_container">
        <img
          alt="close"
          src={closeIcon}
          className="chatbox_close_icon_img"
          onClick={handleCloseChatbox}
        />
      </div>
    </div>
  );
};

export default Navbar;
