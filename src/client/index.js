
import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

import { reduce } from './helper';

export default (worker) => {
  function create(node) {
    const { id, type = 'div', props = {}, children = [], text } = node;
    if (type !== 'plain-text') {
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          if (/^on/.test(key)) {
            props[key.toLowerCase()] = (e) => {
              worker.postMessage({
                event: {
                  type: key,
                  target: {
                    dataset: {
                      rid: props['data-rid'],
                    },
                    id,
                  },
                },
              });
            };
          }
        }
      }
      props.attributes = {
        'data-rid': props['data-rid'],
      };

      return h(`${type}#${id || props.id}`, props, children.map(item => create(item)));
    } else {
      return text;
    }
  }

  const root = document.getElementById('root');
  let rootDom = null;
  let preNode = null;

  worker.onmessage = (e) => {
    console.log('webview线程接收到了消息', e);
    const { data: { action } } = e;
    const tree = reduce(action);
    const nextNode = create(tree.root);
    if (!rootDom) {
      rootDom = createElement(nextNode);
      root.appendChild(rootDom);
    } else {
      const patches = diff(preNode, nextNode);
      patch(rootDom, patches);
    }
    preNode = nextNode;
  };
};
