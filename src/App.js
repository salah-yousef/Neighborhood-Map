import React, { Component } from 'react';
import * as PlacesAPI from './PlacesAPI'
import Header from './header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Map from './Map'
import './App.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      filteredPlaces: [],
      modalIsOpen: false,
      currentPlace: {}
    }
    this.itemClicked = this.itemClicked.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    PlacesAPI.getAllPlaces(48.2082,16.3738,'cafe').then((places) => {
      this.setState({places})
    }).catch((error) => {
      alert('Error While getting All Locations data from FourSquare API >> Sorry!! Locations Data Will not be loaded or displayed ')
      console.log('Error While Getting All Locations')    
    })
    window.gm_authFailure = function() {
      // remove the map div or maybe call another API to load map
     // maybe display a useful message to the user
     var para = document.createElement("P");    
      var t = document.createTextNode("Google maps failed to load! <br> Check You API Key");
      para.appendChild(t);                                          // Append the text to <p>
     document.getElementsByClassName('gm-err-content')[0].innerHTML=para.textContent
    }
  }
  

  onUpdate = (val) => {
    this.setState({
      filteredPlaces: val
    })
  };

  

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
        item.selected = false 
        this.setState({places})
    })
    places.map((item) => {
      if (item.id === itemID) {
        if (item.selected === undefined) {
          item.selected = true
        } else {
            this.openModal()
            item.selected = this.setState({currentPlace: item})
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
                    />
              </div>
              <div className="RightSection">
                    {
                        this.state.filteredPlaces.length>0 ? 
                        (
                          <div className="mapElement">
                            <Map
                              role="application"
                              places = {this.state.filteredPlaces}
                            />
                          </div>
                        ) : 
                        (
                          <div className="mapElement">
                            <Map
                            role="application"
                            places = {this.state.places}
                            />
                          </div>
                        )
                    }
              </div>
        </div>
          <Footer />
          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>
            {
              this.state.currentPlace.name
            }
          </h2>
          {
            this.state.currentPlace.location &&
            <p>Address: {this.state.currentPlace.location.address}</p>             
          }
          {/*  */}
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default App;
