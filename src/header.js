import React, {Component } from 'react'
import logo from './logo2.svg';
import './App.css';

class Header extends Component {
    render () {
        return (
                <header className="App-header">
                <a id="menu">
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