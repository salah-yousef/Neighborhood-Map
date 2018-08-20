import React, { Component } from 'react';
import * as PlacesAPI from './PlacesAPI'
import Header from './header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Map from './Map'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      filteredPlaces: []     
    }
    this.itemClicked = this.itemClicked.bind(this);
    this.toggleBounce = this.toggleBounce.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  
  componentDidMount(){
    PlacesAPI.getAllPlaces(48.2082,16.3738,'cafe').then((places) => {
      this.setState({places})
    }).catch((error) => {
      alert('Error While getting All Locations data from FourSquare API >> Sorry!! Locations Data Will not be loaded or displayed ')
      console.log('Error While Getting All Locations')    
    })
  }

  onUpdate = (val) => {
    this.setState({
      filteredPlaces: val
    })
  };

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
    // let places = [...this.state.places]
    const {places} = this.state
    const filteredPlaces = places.map((item) => {
      if (item.name.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
        item.isVisible = false
        return item;
      }
      
      item.isVisible = true;
      return item;
    })
    this.setState({ filteredPlaces }) 
  }


  itemClicked(itemID) {
    let places = [...this.state.places];
    places.map((item) => {
      if (item.id === itemID) {
        if (item.selected === undefined) {
          item.selected = true
        } else {
          item.selected = !item.selected
        }
        this.setState({places})
        return
      }
    })
  }

 
  render() {
    return (
      <div className="App flex-container">
      <Header />
      <div className="BodySection">
            <div className="LeftSection">
                  <Sidebar 
                        items = {this.state.places}
                        itemClicked = {this.itemClicked}
                        filterMarkers = {this.filterMarkers}
                        onUpdate = {this.onUpdate}
                  />
            </div>
            <div className="RightSection">
                  {
                      this.state.filteredPlaces.length>0 ? 
                      (
                        <div className="mapElement">
                          <Map
                            role="application"
                            toggleBounce={this.toggleBounce} 
                            places = {this.state.filteredPlaces}
                            filterMarkers = {this.filterMarkers}  
                          />
                        </div>
                      ) : 
                      (
                        <div className="mapElement">
                          <Map
                          role="application"
                          toggleBounce={this.toggleBounce} 
                          places = {this.state.places}
                          filterMarkers = {this.filterMarkers}   
                          />
                        </div>
                      )
                  }
            </div>
      </div>
        <Footer />
      </div>
    );
  }
}

export default App;
