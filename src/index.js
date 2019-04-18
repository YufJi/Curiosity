import React from 'react';
import ReactDOM from 'react-dom';

import App from './app'
import { log } from './tools'

log('start render!!')
ReactDOM.render(<App />, document.getElementById('root'));