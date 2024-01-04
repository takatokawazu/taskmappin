import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NotificationMenu = ({
  notification,
  handleMenuClose,
  setViewport,
  assignedTasks,
} : {
  notification : any,
  handleMenuClose : any,
  setViewport : any,
  assignedTasks : any
}) => {
  const isMenuOpen = Boolean(notification);
  return (
    <Menu
      anchorEl={notification}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {assignedTasks.map((task, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleMenuClose();
            setViewport({
              longitude: task.coords.lng,
              latitude: task.coords.lat,
              zoom: 15,
            });
          }}
        >
          {task.title}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationMenu;
