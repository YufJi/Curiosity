import * as React from 'react';
// import dayjs from 'dayjs';

import Header from './header';
import * as styles from './index.scss';
import * as commonStyles from './common.scss';
// import { log } from './tools';

export default class App extends React.Component {

  jump() {
    const promise1 = Promise.resolve(123);
    promise1.then((value) => {
      console.log(value);
    });
  }

  eat(food: string) {
    console.log(food)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={styles.name} onClick={() => this.eat('jyf')}>jyf</div>
        <div className={commonStyles.common} onClick={this.jump}>xxx</div>
      </React.Fragment>
    );
  }
}
