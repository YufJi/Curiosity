
import React from 'react';
import render from './Adapter/lib/render';
import Container from './Adapter/lib/Container';

import './mock/api';

import App from '../bu';

const AppCtx = {};

render(<App />, new Container(AppCtx));

self.onmessage = (e) => {
  console.log('worker线程接收到了消息', e);
  const { data: { event } } = e;
  console.log(event, 'jscore event');
  const dataset = JSON.parse(event.target.dataset);
  AppCtx[`$$METHOD_${dataset.rid}_${dataset.rtype}`] && AppCtx[`$$METHOD_${dataset.rid}_${dataset.rtype}`](event);
};
