import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { People } from '@mui/icons-material';

const RenderMobileMenu = ({
  mobileMenuId,
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
  handleProfileMenuOpen,
  handleNotificationMenuOpen,
  assignedTasks,
  handleAdminPage,
}) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="show mails" color="inherit">
          <Badge badgeContent={onlineUsers.length} color="error">
          <People />
          </Badge>
        </IconButton>
        <p>People</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationMenuOpen}>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={assignedTasks.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleAdminPage}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
};

export default RenderMobileMenu;
