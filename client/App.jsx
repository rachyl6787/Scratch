import React, { Component } from 'react';
import Container from './Container.jsx';
import Login from './Login.jsx';
import styles from './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainApp">
        <Container />
      </div>
    );
  }
}

export default App;
