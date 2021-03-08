import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Context.jsx'

export default function Artist(props) {

    const artistsContext = useContext(Context);
    const { artists, selectedArtists, setSelectedArtists } = artistsContext;

    return (
        <div className="Playlist">
            <form className="Artist_Form">
            {props.name}
            </form>
        </div>
    );
}