import React, { Component }  from 'react';
import {Col, Nav} from 'react-bootstrap';
import logo from '../img/logo.png';
import Navigator from "./navigator";

class Header extends Component {
    render() {
        return (
            <Nav className="navbar">
                <Col md={5} sm={12}>
                    <img src={logo} className="navbar-logo" alt="logo" />
                    <div className="navbar-slogan">
                        <h1 className="navbar-title">Your calendar</h1>
                        <h6 className="navbar-subtitle">Powered by Quipu</h6>
                    </div>
                </Col>
                <Col md={7} sm={12}>
                    <Navigator/>
                </Col>
            </Nav>
        )
    }
}

export default Header;
