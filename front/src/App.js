import React, { Component } from 'react';

import Header from './react/components/Header';
import Calendar from "./react/components/Calendar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Calendar/>
            </div>
        );
    }
}

export default App;
