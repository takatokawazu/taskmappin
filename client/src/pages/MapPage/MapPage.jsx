import React, { useContext, useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import Map, { GeolocateControl } from 'react-map-gl';

import UserMarker from '../../components/Marker/UserMarker';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import Messanger from '../../components/Messanger/Messanger';
import VideoRooms from '../../components/VideoRooms/VideoRooms';
import axios from 'axios';

import * as socketConn from '../../socketConnection/socketConn';
import { connectWithSocketIOServer } from '../../socketConnection/socketConn';
import { connectWithPeerServer } from '../../realtimeCommunication/webRTCHandler';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';
import NewTaskPopup from '../../components/TaskPopup/NewTaskPopup';
import TasksMarker from '../../components/Marker/TasksMarker';
import TaskPopup from '../../components/TaskPopup/TaskPopup';
import Navbar from '../../components/Navbar/Navbar';
import { addTaskHandler } from '../../redux/actions/taskActions';
import { Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Toaster } from 'react-hot-toast';

const libraries = [process.env.REACT_APP_PLACES];

const MapPage = () => {
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const tasks = useSelector((state) => state.task.tasks);
  const [currentUserId, setCurrentUserId] = useState('');
  const { user } = useContext(AuthContext);

  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: process.env.REACT_APP_DEFAULT_LONTITUDE,
    latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
    zoom: 8,
  });

  const [state, setState] = useState({
    newPlace: null,
    formFields: {
      title: '',
      desc: '',
      assignedUser: user.username,
      deadline: '',
    },
    currentPlaceId: null,
    assignedUser: '',
    location: '',
  });

  useEffect(() => {
    connectWithSocketIOServer();
    connectWithPeerServer();
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentUserPosition(position.coords);
            updateUserLocation(position);
          },
          (error) => {
            console.error('位置情報の取得に失敗しました: ' + error.message);
          }
        );
      } else {
        console.error('このブラウザは位置情報をサポートしていません。');
      }
    };

    const timer = setInterval(() => {
      getLocation();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = () => {
      connectWithSocketIOServer();
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            updateUserLocation(position);
          },
          (error) => {
            console.error('位置情報の取得に失敗しました: ' + error.message);
          }
        );
      } else {
        console.error('このブラウザは位置情報をサポートしていません。');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        const res = await axios.get(`/api/users/name/${user.username}`);
        setCurrentUserId(res.data._id);
      }
    };
    fetchUserId();
  }, []);

  const updateUserLocation = (position) => {
    if (user) {
      socketConn.login({
        user,
        coords: {
          lng:
            position.coords.longitude ||
            process.env.REACT_APP_DEFAULT_LONTITUDE,
          lat:
            position.coords.latitude || process.env.REACT_APP_DEFAULT_LATITUDE,
        },
      });
    }
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setViewport({
      longitude: lng,
      latitude: lat,
    });
    setState((prev) => ({
      ...prev,
      newPlace: { lng, lat },
    }));
  };

  const handleFormFieldChange = (field, value) => {
    setState((prev) => ({
      ...prev,
      formFields: { ...prev.formFields, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      createdBy: user.username,
      ...state.formFields,
      coords: state.newPlace,
    };

    try {
      addTaskHandler(newTask);
      connectWithSocketIOServer();
    } catch (error) {
      console.error('Error submitting pin:', error);
    }
    setState((prev) => ({
      ...prev,
      newPlace: null,
      formFields: {
        title: '',
        desc: '',
        assignedUser: prev.formFields.assignedUser,
        deadline: '',
      },
    }));
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get(`api/users/id/${id}`);
      setState((prev) => ({
        ...prev,
        assignedUser: response.data.username,
      }));
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [open, setOpen] = React.useState(false);

  return (
    isLoaded && (
      <Box sx={{ height: '100vh', width: '100%' }}>
        <Navbar
          state={state}
          setState={setState}
          setViewport={setViewport}
          currentUserId={currentUserId}
        />
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          {...viewport}
          style={{ width: '100vw', height: '92vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onMove={(evt) => setViewport(evt.viewState)}
          onDblClick={handleAddClick}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {onlineUsers.map((onlineUser, index) => (
            <UserMarker
              lat={onlineUser.coords?.lat}
              lng={onlineUser.coords?.lng}
              key={index}
              myself={onlineUser?.myself || false}
              userId={onlineUser.userId}
              username={onlineUser.username}
              coords={onlineUser.coords}
              currentUser={user.username}
              onMarkerClick={(lat, long) => {
                setOpen(true);
                setViewport({
                  longitude: long,
                  latitude: lat,
                  zoom: 18,
                });
              }}
            />
          ))}
          {tasks &&
            user &&
            tasks.map((task, index) => (
              <div key={index}>
                <TasksMarker
                  task={task}
                  currentUser={user.username}
                  onMarkerClick={(id, lat, long) => {
                    getUser(task.assignedUser);
                    setState((prev) => ({
                      ...prev,
                      currentPlaceId: id,
                    }));
                    setViewport({
                      longitude: long,
                      latitude: lat,
                      zoom: 15,
                    });
                  }}
                />
                {task._id === state.currentPlaceId && (
                  <TaskPopup
                    task={task}
                    assignedUser={state.assignedUser}
                    onClose={() =>
                      setState((prev) => ({ ...prev, currentPlaceId: null }))
                    }
                  />
                )}
              </div>
            ))}
          {state.newPlace && (
            <NewTaskPopup
              longitude={state.newPlace.lng}
              latitude={state.newPlace.lat}
              onSubmit={handleSubmit}
              onlineUsers={onlineUsers}
              formFields={state.formFields}
              handleFormFieldChange={handleFormFieldChange}
              onClose={() => setState((prev) => ({ ...prev, newPlace: null }))}
            />
          )}
          <Toaster />
        </Map>
        <Messanger />
        {cardChosenOption && currentUserPosition && (
          <UserInfoCard
            open={open}
            setOpen={setOpen}
            userId={cardChosenOption.userId}
            username={cardChosenOption.username}
            userLocation={cardChosenOption.coords}
            currentUserPosition={currentUserPosition}
          />
        )}

        <VideoRooms />
      </Box>
    )
  );
};

export default MapPage;
