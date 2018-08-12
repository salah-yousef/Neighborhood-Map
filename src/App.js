import React, { Component } from 'react';
import * as PlacesAPI from './PlacesAPI'
import Header from './header'
import Sidebar from './sidebar'
import MapContainer from './MapContainer'
import './App.css';

class App extends Component {
  state = {
    places: []
  }


  componentDidMount(){
    PlacesAPI.getAllPlaces(30.0444,31.2357,'cafe').then((places) => {
      this.setState({places})
    }).catch((error) => {
      alert('Error While getting All Locations data from FourSquare API >> Sorry!! Locations Data Will not be loaded or displayed ')
      console.log('Error While Getting All Locations')
      
    })
  }

  render() {
    return (
      <div className="App flex-container">
        <div className="LeftSection">
            <Sidebar />
        </div>
        <div className="RightSection">
            <Header />
            {
              (this.state.places &&  <MapContainer 
                places = {this.state.places} 
                />)
              
            }
            
        </div>
        
      </div>
    );
  }
}

export default App;
