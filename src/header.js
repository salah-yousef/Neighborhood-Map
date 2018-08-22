import React, {Component } from 'react'
import logo from './logo2.svg';
import './App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
    }    
    handleClickMenu(e) {
        e.preventDefault();
        const drawer = document.querySelector('.LeftSection');
          this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
          if ( drawer.classList.toggle('LeftSectionOpen') ) {
            e.stopPropagation();
          } else {
            drawer.classList.remove('LeftSectionOpen');
          }
      }
    
    render () {
        return (
                <header className="App-header">
                <a id="menu" 
                    className="header-menu" 
                    onClick={this.handleClickMenu} 
                    role="navigation"
                    aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                    </svg>
                </a>
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
        )
    }
}



export default Header