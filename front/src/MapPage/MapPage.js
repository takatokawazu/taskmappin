import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import CustomMarker from './Marker';
import { setMyLocation } from '../MapPage/mapSlice';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import Messanger from '../Messanger/Messanger';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapPage.css';
import { getCurrentPosition } from '../utils/location';
import { createOnError, createOnSuccess } from '../utils/locationHandler';
import { proceedWithLogin } from '../stores/actions/loginPageAction';
import { useParams } from 'react-router-dom';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const { username } = useParams();
  const dispatch = useDispatch();
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);
  const [viewport, setViewport] = useState({
    longitude: 130.7806734,
    latitude: 32.7972297,
    zoom: 8,
  });

  const onError = createOnError(setLocationErrorOccurred);
  const onSuccess = createOnSuccess(dispatch, setMyLocation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        connectWithSocketIOServer();
        await getCurrentPosition(onSuccess, onError);
        console.log(myLocation);
        proceedWithLogin({
          username,
          coords: {
            lng: myLocation?.lng || 130.7785443,
            lat: myLocation?.lat || 32.8037207,
          },
        });
      } catch (error) {
        onError(error);
      }
    };
    if (!myLocation) {
      fetchData();
    }
  }, []);

  console.log(onlineUsers);

  return (
    <div className="map_page_container">
      {!locationErrorOccurred && (
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
      )}
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
