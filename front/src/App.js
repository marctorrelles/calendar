import React, { Component } from 'react';

import Header from './react/components/Header';
import Calendar from "./react/components/Calendar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Calendar/>
                {/*<p className="App-intro">*/}
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
            </div>
        );
    }
}

export default App;
