export const createOnSuccess = (dispatch, setMyLocation) => (position) => {
  dispatch(
    setMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  );
};

export const createOnError = (setLocationErrorOccurred) => (error) => {
  console.log('Error occured!');
  console.log(error);
  setLocationErrorOccurred(true);
};
