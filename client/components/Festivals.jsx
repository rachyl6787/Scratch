import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import Result from "./Result.jsx";

class Festivals extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            search: '',
            artists: [],
        };
      }


   handleChange (e) {
        this.setState({ search: e.target.value });
    }



    render() {

    const festivals = {
        "Outside Lands Music & Arts Festival 2021" : 39627349,
        "Lockn' Music Festival 2021": 39585457,
        "Riot Fest 2021": 39621304,
    };

        const results = [];

        for (let x in festivals) {
                results.push(<Result
                    key={x}
                    displayName={x}
                    id={festivals[x]}
                    />);
        }

    return (
        <div className="Festivals_Countainer">
            <div className="Festivals">
                <h2 className="Festivals_Header">Search Upcoming Festivals</h2>
                <form className="Festival_Form" onSubmit={e => { e.preventDefault();}} >
                    <input className="Search_Input"
                        name="userSearch"
                        type="text"
                        placeholder="Search upcoming festivals"
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <input className="Search_Button" type='submit' value="Search Festivals" />
                </form>
               {results}
            </div>
        </div>
    );
   }
}

export default Festivals;