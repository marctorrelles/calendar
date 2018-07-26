import React, { Component}  from 'react';
import logo from '../img/logo.png';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Quipu!</h1>
            </header>
        )
    }

}

export default Header;
