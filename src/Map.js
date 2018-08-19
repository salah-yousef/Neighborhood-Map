import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class myMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
 
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
};

  render() {
    const places = this.props.places
    const { google, map } = this.props;
    console.log(places)
    const style = {
      width: '100%',
      height: '100%',
      top: '60px'
    }
    return (
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={style} 
          initialCenter ={{
            lat: 30.0444,
            lng: 31.2357
          }}
          aria-label="location" 
          role="application" 
          zoom={14}>
          {
            places.map(place => 
            <Marker
              aria-label="The Selected Cafe"
              key={place.id}
              onClick={this.onMarkerClick}
              name={place.name}
              address={place.location.address}
              selected={place.id === this.props.selectedCafe}
              position={{lat: place.location.lat , lng:place.location.lng}}
              map = {map}
              animation= {place.selected ? google.maps.Animation.BOUNCE : null}
              visible={place.isVisible}
            />)
          }
        <InfoWindow
            aria-label="Information about cafe"
            marker={this.state.activeMarker}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            visible={this.state.showingInfoWindow}>
              <div tabIndex={0} aria-label="Info Window">
                <h1>{this.state.selectedPlace.name}</h1>
                <h3>Address: </h3>
                <p>{this.state.selectedPlace.address}</p>
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
})(myMap)