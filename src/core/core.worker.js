
import React from 'react';

import render from './Adapter/lib/render';
import Container from './Adapter/lib/Container';

import App from '../bu/app';

const AppCtx = {};

render(<App />, new Container(AppCtx));

self.onmessage = (e) => {
  console.log('worker线程接收到了消息', e);
  const { data: { event } } = e;
  console.log(event, 'jscore event');
  AppCtx[`$$METHOD_${event.target.dataset.rid}_${event.type}`] && AppCtx[`$$METHOD_${event.target.dataset.rid}_${event.type}`](event);
};
