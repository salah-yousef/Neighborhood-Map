import React, { Component } from 'react';
import * as PlacesAPI from './PlacesAPI'
import Header from './header'
import Sidebar from './Sidebar'
import Map from './Map'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
    this.itemClicked = this.itemClicked.bind(this);
    this.toggleBounce = this.toggleBounce.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);

  }

  componentDidMount(){
    PlacesAPI.getAllPlaces(30.0444,31.2357,'cafe').then((places) => {
      this.setState({places})
    }).catch((error) => {
      alert('Error While getting All Locations data from FourSquare API >> Sorry!! Locations Data Will not be loaded or displayed ')
      console.log('Error While Getting All Locations')
      
    })
  
  }

  toggleBounce(marker) {
    console.log('bouncing?')
    let google = this.props.google
    if (marker.getAnimation() !== null && marker.getAnimation() !== undefined) {
      marker.setAnimation(null)
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(function() {
        marker.setAnimation(null)
      }, 2100)
    }
  }

  filterMarkers(filter) {
    let places = [...this.state.places];
    places.forEach((item) => {
      if (item.name.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
        item.isVisible = false;
        return;
      }
      item.isVisible = true;
    });
    this.setState({ 
      places
    });
  }



  itemClicked(itemID) {
    let places = [...this.state.places];
    places.forEach((item) => {
      if (item.id === itemID) {
        if (item.selected === undefined) {
          item.selected = true;
        } else {
          item.selected = !item.selected;
        }
        return;
      }
      this.setState({ 
        places,
      });
    });
  }

  render() {
    return (
      <div className="App flex-container">
        <div className="LeftSection">
            <Sidebar 
                  items = {this.state.places}
                  itemClicked = {this.itemClicked}
                  filterMarkers = {this.filterMarkers}  
            />
        </div>
        <div className="RightSection">
            <Header />
            {
              (this.state.places &&  <Map
                role="application"
                toggleBounce={this.toggleBounce} 
                places = {this.state.places} 
                />)
              
            }
            
        </div>
        
      </div>
    );
  }
}

export default App;
