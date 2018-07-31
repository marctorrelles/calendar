import React, { Component }  from 'react';
import logo from '../../img/logo.png';

class Header extends Component {

    render() {
        return (
            <div className="navbar">
                    <img src={logo} className="navbar-logo" alt="logo" />
                    <div className="navbar-slogan">
                        <h1 className="navbar-title">Your calendar</h1>
                        <h6 className="navbar-subtitle">Powered by Quipu</h6>
                    </div>
            </div>
        )
    }
}

export default Header;
