import React, { Component } from 'react';
import Banner from './Banner.jsx';
import Festivals from './Festivals.jsx';
import Playlist from './Playlist.jsx';
import YourEvents from './YourEvents.jsx';
import styles from './app.scss';

export class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Container">
        <Banner />
        <Festivals />
        <Playlist />
        <YourEvents />
      </div>
    );
  }
}

export default Container;
