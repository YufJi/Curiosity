
import { h, create, diff, patch } from 'virtual-dom';

import { reduce } from './helper';

export default (worker) => {
  function createNode(node) {
    const { id, type = 'div', props = {}, children = [], text } = node;
    if (type !== 'plain-text') {
      props.attributes = {};
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          if (/^on/.test(key)) {
            props.attributes['data-rtype'] = key;
          }
        }
      }

      props.attributes['data-rid'] = props['data-rid'];

      return h(`${type}#${id || props.id}`, props, children.map(item => createNode(item)));
    } else {
      return text;
    }
  }

  document.addEventListener('click', (e) => {
    const event = {
      type: 'click',
      target: {
        dataset: JSON.stringify(e.target.dataset),
      },
      currentTarget: null,
    };
    if (e.currentTarget) {
      event.currentTarget = {
        dataset: JSON.stringify(e.currentTarget.dataset),
      };
    }
    worker.postMessage({
      event,
    });
  });

  const root = document.getElementById('root');
  let rootDom = null;
  let preNode = null;

  worker.onmessage = (e) => {
    console.log('webview线程接收到了消息', e);
    const { data: { action } } = e;
    const tree = reduce(action);
    const nextNode = createNode(tree.root);
    if (!rootDom) {
      rootDom = create(nextNode);
      root.appendChild(rootDom);
    } else {
      const patches = diff(preNode, nextNode);
      patch(rootDom, patches);
    }
    preNode = nextNode;
  };
};
