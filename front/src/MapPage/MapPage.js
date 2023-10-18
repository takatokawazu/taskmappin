import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import CustomMarker from './Marker';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import Messanger from '../Messanger/Messanger';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';
import { proceedWithLogin } from '../stores/actions/loginPageAction';
import { useParams } from 'react-router-dom';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';

const MapPage = () => {
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const { username } = useParams();
  const [viewport, setViewport] = useState({
    longitude: process.env.REACT_APP_DEFAULT_LONTITUDE,
    latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
    zoom: 8,
  });

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
  console.log(onlineUsers);

  const updateUserLocation = (position) => {
    proceedWithLogin({
      username,
      coords: {
        lng:
          position.coords.longitude || process.env.REACT_APP_DEFAULT_LONTITUDE,
        lat: position.coords.latitude || process.env.REACT_APP_DEFAULT_LATITUDE,
      },
    });
  };

  return (
    <div className="map_page_container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
        <ReactMapGL
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          {...viewport}
          style={{ width: '100vw', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onMove={(evt) => setViewport(evt.viewState)}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {onlineUsers.map((onlineUser) => {
            return (
              <CustomMarker
                lat={onlineUser.coords?.lat}
                lng={onlineUser.coords?.lng}
                key={onlineUser.socketId}
                myself={onlineUser?.myself || false}
                socketId={onlineUser.socketId}
                username={onlineUser.username}
                coords={onlineUser.coords}
                currentUser={username}
              />
            );
          })}
        </ReactMapGL>
      </LoadScript>
      <Messanger />
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
        />
      )}
    </div>
  );
};

export default MapPage;
