import React, { Component } from 'react';
import Container from './Container.jsx';
import Login from './Login.jsx';
import styles from '../app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currCookies = document.cookie;

    if (!currCookies.includes('9HWmQ0ME')) {
      return (
        <div>
         <Login />
         </div>
      );
    } else {
      console.log('logged in');
      return (
        <div>
          <Container />
        </div>
      );
    }
  }
}

export default App;
