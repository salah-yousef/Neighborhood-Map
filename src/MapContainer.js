import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const places = this.props.places
    return (
      <Map google={this.props.google} zoom={16}>
          center={{
            lat: 30.0444,
            lng: 31.2357
          }}
        <Marker
              name={places[0].name}
              position={{lat: places[0].location.lat , lng:places[0].location.lng}} />
        <Marker
              name={places[1].name}
              position={{lat: places[1].location.lat , lng:places[1].location.lng}} />
        <Marker
              name={places[2].name}
              position={{lat: places[2].location.lat , lng:places[2].location.lng}} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>hi</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCEJAF8ARvJG4y9q4nmsgAQBTef5ToY2mw'),
  LoadingContainer: LoadingContainer
})(MapContainer)