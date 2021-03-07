import React, { Component } from 'react';
import Container from './Container.jsx';
import Login from './Login.jsx';
import styles from './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currCookies = document.cookie;

    if (!currCookies.includes('9HWmQ0ME')) {
      console.log('login');
      return (
        <div>
          <Login />
        </div>
      );
    } else {
      console.log('logged in');
      return (
        <div>
          <h1>You are Logged In</h1>
          <Container />
        </div>
      );
    }
  }
}

export default App;
