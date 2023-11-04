import React, { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { addChatbox } from '../../redux/slices/messangerSlice';
import AuthContext from '../../context/AuthContext';

const OnlineUserMenu = ({ anchorEl, menuId, handleMenuClose, setViewport }) => {
  const isMenuOpen = Boolean(anchorEl);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleAddChatbox = (username, userId) => {
    if (user.username !== username) {
      dispatch(
        addChatbox({
          username,
          userId,
        })
      );
    }
  };

  console.log(onlineUsers);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {onlineUsers.map((onlineUser) => (
        <MenuItem
          key={onlineUser.userId}
          onClick={() => {
            handleMenuClose();
            handleAddChatbox(onlineUser.username, onlineUser.userId);
            setViewport({
              longitude: onlineUser.coords.lng,
              latitude: onlineUser.coords.lat,
              zoom: 18,
            });
          }}
        >
          {onlineUser.username}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default OnlineUserMenu;
