import React, { useState, useEffect } from 'react';
import Artist from "./Artist.jsx";

export default function Playlist (props) {

    const artistArray = props.artists;

        const artistList = [];

        for (let i = 0; i < artistArray.length; i++) {
            artistList.push(<Artist 
                key={i}
                name={artistArray[i]}
                />)
        }

        const handleSubmit = () => {

            const request = {
                "token": "1234",
                "festival": "Outside Lands Music & Arts Festival 2021",
                "artists": props.artists
            }
            console.log("request: ", request)
            fetch('api/spotapi/', {
                method: 'POST',
                body: JSON.stringify(request)
            })
        }

        return (
            <div className="Playlist">
                <h2>Playlist Builder</h2>
                <div className="Artist_Grid">
                    <ul>
                    {artistList.map(item => 
                        <li>{item}</li>
                    )}
                    </ul>
                </div>
                <form className="Create_Playlist" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                
                <input className="Create_Button" type="submit" value="Create Playlist" />
                </form>
            </div>

        );
}
