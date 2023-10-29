import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NotificationMenu = ({
  notification,
  handleMenuClose,
  setViewport,
  assignedTasks,
}) => {
  const isMenuOpen = Boolean(notification);
  return (
    <Menu
      notification={notification}
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
      {assignedTasks.map((task) => (
        <MenuItem
          key={task._id}
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
