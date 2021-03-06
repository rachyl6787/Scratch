import React, { useState, useEffect } from 'react';
import Banner from './Banner.jsx';
import Festivals from './Festivals.jsx';
import Playlist from './Playlist.jsx';
import YourEvents from './YourEvents.jsx';
import styles from './app.scss';

export default function Container() {


    return (
        <div className="Container">
        <Banner />
        <Festivals />
        <Playlist />
        <YourEvents />
      </div>
    );
}


