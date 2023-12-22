interface Coordinate {
  latitude: number;
  longitude: number;
}

export const calulateDistanceBetweenCoords = (
  coord1: Coordinate,
  coord2: Coordinate
): number => {
  return getDistanceFromLatLonInKm(
    coord1.latitude,
    coord1.longitude,
    coord2.latitude,
    coord2.longitude
  );
};

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return roundToTwoDecimals(distance);
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

const roundToTwoDecimals = (num: number): number => {
  return +(Math.round(num * 100) / 100).toFixed(2);
};
