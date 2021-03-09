import React, { useState, useEffect } from 'react';
import Artist from './Artist.jsx';

export default function Playlist(props) {
  const artistArray = props.artists;
  const fest = props.festival;

  const artistList = [];

  for (let i = 0; i < artistArray.length; i++) {
    artistList.push(<Artist key={i} name={artistArray[i]} />);
  }

  const handleSubmit = () => {
    const request = {
      festival: fest,
      artists: props.artists,
    };

    fetch('api/spotapi/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(request),
    });
  };

  return (
    <div className="Playlist">
      <h2>Playlist Builder</h2>
      <div className="Artist_Grid">
        <ul>
          {artistList.map((item, idx) => (
            <li key={`pl${idx}`}>{item}</li>
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
