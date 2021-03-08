import React, { useState, useEffect } from 'react';
import Artist from './Artist.jsx';

export default function Playlist(props) {
  const artistArray = props.artists;

  const artistList = [];

  for (let i = 0; i < artistArray.length; i++) {
    artistList.push(<Artist key={i} name={artistArray[i]} />);
  }

  const handleSubmit = () => {
    const request = {
      token: 'INSERT_TOKEN',
      festival: 'INSERT_FESTIVAL',
      artists: props.artists,
    };
    console.log('request: ', JSON.stringify(request));
    fetch('api/spotapi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }); // body: JSON.stringify('LOLOLLLLLOL'),
  };

  return (
    <div className="Playlist">
      <h2>Playlist Builder</h2>
      <div className="Artist_Grid">
        <ul>
          {artistList.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <form
        className="Create_Playlist"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className="Create_Button"
          type="submit"
          value="Create Playlist"
        />
      </form>
    </div>
  );
}
