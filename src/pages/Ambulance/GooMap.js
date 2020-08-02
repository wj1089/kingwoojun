import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';

const mapStyles = {
  position: 'absolute',
  width: '76%',
  height: '70%',
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        point:[{  lat:37.562457, lng:126.941089 },
                { lat:37.579602, lng:126.998998 },
                { lat:37.550999, lng:126.8589698 }]
      
    };
      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  render() {
    return (
      <div>
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
            lat: 37.562457,lng: 126.941089
        }}
      >
            {this.state.point.map((con,i)=>{//맵(맵으로 보내준다) : 자신이 설정한 주소를 배열분해해서 각 위도와 경도를 계속 돌려서 뜨게끔한다. 
                return(<Marker
                    position={con}
                    animation={4}
                    />);
            })}
      

    <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
    </InfoWindow>
    </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDyYteoY6q3NQwsEHFrXfan_q_9VlIVsxk'
})(MapContainer);