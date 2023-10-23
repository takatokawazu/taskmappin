import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Map, { GeolocateControl, Popup } from 'react-map-gl';

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

const MapPage = () => {
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const { username } = useParams();
  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: process.env.REACT_APP_DEFAULT_LONTITUDE,
    latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
    zoom: 8,
  });

  const [state, setState] = useState({
    newPlace: null,
    formFields: { title: '', desc: '', assignedUser: username, deadline: '' },
    tasks: [],
    currentPlaceId: null,
    assignedUser: '',
    currentUser: username,
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
    }, 5000);

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
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/tasks');
        setState((prev) => ({ ...prev, tasks: response.data }));
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchTasks();
  }, []);

  const updateUserLocation = (position) => {
    socketConn.login({
      username,
      coords: {
        lng:
          position.coords.longitude || process.env.REACT_APP_DEFAULT_LONTITUDE,
        lat: position.coords.latitude || process.env.REACT_APP_DEFAULT_LATITUDE,
      },
    });
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
      createdBy: username,
      ...state.formFields,
      coords: state.newPlace,
    };

    try {
      const res = await axios.post('http://localhost:3003/api/tasks', newTask);
      setState((prev) => ({
        ...prev,
        tasks: [...prev.tasks, res.data],
        newPlace: null,
      }));
    } catch (error) {
      console.error('Error submitting pin:', error);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/users/${id}`);
      setState((prev) => ({
        ...prev,
        assignedUser: response.data.username,
      }));
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${state.location}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );

        if (response.data.results && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setViewport({
            longitude: lng,
            latitude: lat,
            zoom: 18,
          });
        }
      } catch (error) {
        console.error('Error fetching geocoding results', error);
      }
    }
  };

  return (
    <div className="map_page_container">
      <input
        type="text"
        value={state.location}
        onChange={(e) =>
          setState((prev) => ({ ...prev, location: e.target.value }))
        }
        onKeyPress={handleSearch}
        placeholder="Enter a location"
      />
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          {...viewport}
          style={{ width: '100vw', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onMove={(evt) => setViewport(evt.viewState)}
          onDblClick={handleAddClick}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {onlineUsers.map((onlineUser) => (
            <UserMarker
              lat={onlineUser.coords?.lat}
              lng={onlineUser.coords?.lng}
              key={onlineUser.socketId}
              myself={onlineUser?.myself || false}
              socketId={onlineUser.socketId}
              username={onlineUser.username}
              coords={onlineUser.coords}
              currentUser={username}
            />
          ))}
          {state.tasks.map((task) => (
            <div key={task._id}>
              <TasksMarker
                task={task}
                currentUser={state.currentUser}
                onMarkerClick={(id, lat, long) => {
                  getUser(task.assignedUser);
                  setState((prev) => ({
                    ...prev,
                    currentPlaceId: id,
                  }));
                  setViewport({
                    longitude: long,
                    latitude: lat,
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
              onClose={() => setState((prev) => ({ ...prev, newPlace: null }))}
              onSubmit={handleSubmit}
              onlineUsers={onlineUsers}
              handleFormFieldChange={handleFormFieldChange}
              formFields={state.formFields}
            />
          )}
        </Map>
      </LoadScript>
      <Messanger />
      {cardChosenOption && currentUserPosition && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
          currentUserPosition={currentUserPosition}
        />
      )}
      <VideoRooms />
    </div>
  );
};

export default MapPage;
