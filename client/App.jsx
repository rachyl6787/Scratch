import React, { Component } from 'react';
import Banner from './Banner.jsx';
import Container from './Container.jsx';
import Festivals from './Festivals.jsx';
import Login from './Login.jsx';
import Playlist from './Playlist.jsx';
import YourEvents from './YourEvents.jsx';
import styles from './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainApp">
        <Banner />
        <Festivals />
        <Playlist />
        <YourEvents />
      </div>
    );
  }
}

export default App;
