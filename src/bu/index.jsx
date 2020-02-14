import React from 'react';
import dayjs from 'dayjs';

import Header from './header';
//  worker中不能插入样式 这块属于业务代码，需要拎出去单独打包，然后样式文件丢到webview去加载
// import './index.scss';

export default class App extends React.Component {
  state = {
    list: [1, 3, 4],
  }

  componentDidMount() {

  }

  jump = () => {
    console.log('trigger jump');
    const promise1 = Promise.resolve(Array.from({ length: ~~(Math.random()*10) }, (v, k) => k+1));
    promise1.then((value) => {
      console.log(value);
      this.setState({
        list: value,
      });
    });
  }

  sing = (e) => {
    console.log('trigger sing', e);
    singjyf('asd');
  }

  render() {
    console.log(this.state, 'state');
    const { list } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div onClick={this.jump}>
          click me
          <div onClick={this.sing}>child click me</div>
        </div>
        {list.map(num => <div>{num}</div>)}
        <div>{dayjs().format('YYYY-MM-DD')}</div>
      </React.Fragment>
    );
  }
}
