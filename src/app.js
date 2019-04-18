import React from 'react';
import dayjs from 'dayjs';

import Header from './header';
import styles from './index.less';
import commonStyles from './common.less';
import { log } from './tools';

export default class App extends React.Component {

  jump() {
    var promise1 = Promise.resolve(123);
    promise1.then(function(value) {
      console.log(value);
    });
  }

  render() {
    log('logging component~~~', dayjs().format('YYYY-MM-DD'))

    const num = 1_0000_0000_88;
    return (
      <React.Fragment>
        <Header />
        <div className={styles.name}>jyf</div>
        <div>{num}</div>
        <div className={commonStyles.common} onClick={this.jump}>xxx</div>
      </React.Fragment>
    )
  }
}