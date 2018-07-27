import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';
import './css/style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
