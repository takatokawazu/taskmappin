export const calulateDistanceBetweenCoords = (coord1, coord2) => {
  return getDistanceFromLatLonInKm(
    coord1.lat,
    coord1.lng,
    coord2.lat,
    coord2.lng
  );
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return roundToTwoDecimals(d);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const roundToTwoDecimals = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const getCurrentPosition = (onSuccess, onError) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
        onSuccess(position);
      },
      (error) => {
        reject(error);
        onError(error);
      },
      locationOptions
    );
  });
};

export { getCurrentPosition };
