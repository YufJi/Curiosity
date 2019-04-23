import * as React from 'react';
import { Component } from 'react';
import * as dayjs from 'dayjs';

import Header from './header';
import * as styles from './index.scss';
import * as commonStyles from './common.scss';

export default class App extends Component {

  readonly state = {
    list: [12, 3, 4],
  }

  jump() {
    const promise1 = Promise.resolve(123);
    promise1.then((value) => {
      console.log(value);
    });
  }

  eat<T>(food: T): void {
    console.log(food, name);
    const { list } = this.state;
    for (let index = 0; index < list.length; index+=1) {
      // const element = array[index];
      this.jump();
    }
  }

  test() {
    interface Point {
      x: number,
      y: number,
      z?: any,
    }

    const p: Point = { x: 123, y: 456, z: 78 };

    abstract class Control {
      private age: any;
      protected name: string;
      constructor() {
        this.name = 'jyf';
      }
      dui() {
        console.log(this.age, this.name);
      }
      abstract haha(): void;
    }

    interface SelectableControl extends Control {
      select(): void;
    }

    class Button extends Control implements SelectableControl {
      select() {
        console.log(1212);
      }
      haha() {

      }
    }

    class TextBox extends Control {
      // select() {}
      haha() {

      }
    }
    console.log(new Button(), new TextBox(), p)
  }

  render() {
    console.log(this.state, 'state');
    const arr: Array<number> = [1, 2, 3];
    enum Color { Red, white, black };

    const myColor: Color = Color.black;

    return (
      <React.Fragment>
        <Header />
        <div className={styles.name} onClick={() => this.eat<string>('jyf')}>jyf</div>
        <div className={commonStyles.common} onClick={this.jump}>xxx</div>
        {arr.map(num => <div>{num}</div>)}
        <div>{myColor}</div>
        <div>{dayjs().format('YYYY-MM-DD')}</div>
      </React.Fragment>
    );
  }
}
