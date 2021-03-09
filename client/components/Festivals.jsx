import React, { useState, useEffect } from 'react';
import Result from './Result.jsx';

export default function Festivals(props) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    return results;
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    const temp = [];

    const festivals = {
      'Outside Lands Music & Arts Festival 2021': 39627349,
      "Lockn' Music Festival 2021": 39585457,
      'Riot Fest 2021': 39621304,
      'Monster Energy Aftershock 2021': 39649774,
      'Ill Points Festival 2021': 39574608,
      'BottleRock Napa Valley 20201': 39565421,
    };
    for (let x in festivals) {
      if (x.toLowerCase().includes(search.toLowerCase())) {
        temp.push(
          <Result
            key={x}
            displayName={x}
            id={festivals[x]}
            artists={props.artists}
            updateArtists={props.updateArtists}
            updateFestival={props.updateFestival}
          />
        );
      }
    }
    setResults(temp);
  };

  return (
    <div className="Festivals">
      <div>
        <h2>Search Upcoming Festivals</h2>
        <form
          className="Festival_Form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="Search_Input"
            name="userSearch"
            type="text"
            placeholder="Search upcoming festivals"
            value={search}
            onChange={handleChange}
          />
          <input
            className="Search_Button"
            type="submit"
            value="Search Festivals"
          />
        </form>
        <div>{results}</div>
      </div>
    </div>
  );
}
