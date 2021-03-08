import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Context.jsx';
import Artist from './Artist.jsx';

export default function Playlist(props) {

    // const artistsContext = useContext(Context);
    // const { artists, selectedArtists, setSelectedArtists } = artistsContext;

    // const artist = ["The Strokes", "Tame Impala", "Gogol Bordello"];

    // return () => {
    //     if (artists.length === 0) {
    //         return (
    //             <div className="Playlist">
    //                 <h2>Playlist Builder</h2>
    //                 <form className="Artist_Form">
    //                     Nothing to Show Yet
    //                     </form>
    //             </div>
    //         );
    //     }
    //     const artistComp = [];
    //     for (let i = 0; i < artists.length; i++) {
    //         artistComp.push(<Artist key={`Artist${i}`}
    //             name={artists[i]} />)
    //     }
        return (
            <div className="Playlist">
                <h2>Playlist Builder</h2>
                <form className="Artist_Form">
                <Artist key='Artist1'
                name='The Strokes' />
                <Artist key='Artist2'
                name='Tame Impala' />
                <Artist key='Artist3'
                name='Gogol Bordello' />
                </form>
            </div>
        );
   // }
}