import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100%px',
  height: '600px'
};
 
const center = {
  lat: 37.562457,
  lng: 126.941089
};

const MyComponent =()=> {
  const [map, setMap] = React.useState(null)//null값을 줌으로써 타입정의를 안한상태
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDyYteoY6q3NQwsEHFrXfan_q_9VlIVsxk"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
      position={{   lat: 37.562457,lng: 126.941089 }}
    />
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(MyComponent)