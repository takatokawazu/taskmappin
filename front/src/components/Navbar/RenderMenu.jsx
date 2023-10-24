import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { addChatbox } from '../../redux/slices/messangerSlice';
import { useParams } from 'react-router-dom';

const RenderMenu = ({ anchorEl, menuId, handleMenuClose }) => {
  const isMenuOpen = Boolean(anchorEl);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const currentUser = useParams().username;
  const dispatch = useDispatch();
  const handleAddChatbox = (username, socketId) => {
    if (currentUser !== username) {
      dispatch(
        addChatbox({
          username,
          socketId,
        })
      );
    }
  };
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
          onClick={() => {
            handleMenuClose();
            handleAddChatbox(onlineUser.username, onlineUser.socketId);
          }}
        >
          {onlineUser.username}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default RenderMenu;
