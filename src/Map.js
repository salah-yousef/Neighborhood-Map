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
 
onMarkerClick = (props, marker) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
}
onMapClicked = () => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
  this.props.places.map((item) => {    
    item.selected = false 
    this.setState({
      activeMarker: {},
      selectedPlace: {},
    })
  })
}




  render() {
    const places = this.props.places
    const { google, map } = this.props;
    const style = {
      width: '100%',
      height: '100%',
    }
    return (
      <Map 
          className="my-map"
          google={this.props.google}
          onClick={this.onMapClicked}
          style={style} 
          initialCenter ={{
            lat: 48.2082,
            lng: 16.3738
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


 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCEJAF8ARvJG4y9q4nmsgAQBTef5ToY2mw'),
})(myMap)