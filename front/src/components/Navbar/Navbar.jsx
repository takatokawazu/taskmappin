import React, { useContext, useRef, useState } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from '@mui/material/';
import {
  MoreVert,
  Notifications,
  AccountCircle,
  Search,
  HighlightOffRounded,
  People,
} from '@mui/icons-material';
import {
  StyledInputBase,
  SearchIconWrapper,
  SearchStyle,
} from './NavbarStyles';
import OnlineUserMenu from './OnlineUserMenu';
import RenderMobileMenu from './RenderMobileMenu';
import NotificationMenu from './NotificationMenu';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = ({ state, setState, setViewport, currentUserId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const { user } = useContext(AuthContext);
  const tasks = useSelector((state) => state.task.tasks);
  const navigate = useNavigate();

  const assignedTasks = tasks
    .filter((task) => task.assignedUser === currentUserId)
    .filter(
      (task, index, self) => index === self.findIndex((t) => t._id === task._id)
    );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotification(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setNotification(null);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const inputRef = useRef();
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setState((prev) => ({ ...prev, location: place.formatted_address }));
      setViewport({
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat(),
        zoom: 18,
      });
    }
  };

  const [inputValue, setInputValue] = useState(state.location);

  const clearInput = () => {
    setInputValue('');
    setState((prev) => ({ ...prev, location: '' }));
  };

  const handleAdminPage = () => {
    if (user) {
      navigate(`/admin/${user.username}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <SearchStyle>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <div style={{ position: 'relative' }}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={state.location}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setState((prev) => ({ ...prev, location: e.target.value }));
                  }}
                />
                {inputValue && (
                  <IconButton
                    onClick={clearInput}
                    style={{ position: 'absolute', right: '8px' }}
                  >
                    <HighlightOffRounded />
                  </IconButton>
                )}
              </div>
            </StandaloneSearchBox>
          </SearchStyle>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show mails"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Badge badgeContent={onlineUsers.length} color="error">
                <People />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={assignedTasks.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleAdminPage}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <RenderMobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        setMobileMoreAnchorEl={setMobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleNotificationMenuOpen={handleNotificationMenuOpen}
        assignedTasks={assignedTasks}
        handleAdminPage={handleAdminPage}
      />
      <OnlineUserMenu
        anchorEl={anchorEl}
        menuId={menuId}
        handleMenuClose={handleMenuClose}
        setViewport={setViewport}
      />
      {assignedTasks.length !== 0 && (
        <NotificationMenu
          notification={notification}
          handleMenuClose={handleMenuClose}
          setViewport={setViewport}
          assignedTasks={assignedTasks}
        />
      )}
    </Box>
  );
};

export default Navbar;
