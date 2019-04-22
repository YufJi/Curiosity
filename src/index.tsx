import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';
import { log } from './tools';

log('start render!!');
// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
