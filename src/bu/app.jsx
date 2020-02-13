import React from 'react';
import dayjs from 'dayjs';

import Header from './header';

export default class App extends React.Component {
  state = {
    list: [1, 3, 4],
  }

  jump = () => {
    const promise1 = Promise.resolve(Array.from({ length: ~~(Math.random()*10) }, (v, k) => k+1));
    promise1.then((value) => {
      console.log(value);
      this.setState({
        list: value,
      });
    });
  }


  render() {
    console.log(this.state, 'state');
    const { list } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div onClick={this.jump}>xxx</div>
        {list.map(num => <div>{num}</div>)}
        <div>{dayjs().format('YYYY-MM-DD')}</div>
      </React.Fragment>
    );
  }
}
