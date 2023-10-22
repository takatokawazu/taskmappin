import React from 'react';
import { useDispatch } from 'react-redux';
import closeIcon from '../../../resources/images/close-icon.svg';
import { removeChatbox } from '../../../redux/slices/messangerSlice';

const Navbar = ({ username, socketId }) => {
  const dispatch = useDispatch();
  const handleCloseChatbox = () => {
    dispatch(removeChatbox(socketId));
  };

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
