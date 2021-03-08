import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

export const Provider = props => {
    const {
        artists: initialArtists,
        selectedArtists: initialSelectedArtists,
        children
    } = props;

    const [artists, setArtists] = useState(initialArtists);
    const [selectedArtists, setSelectedArtists] = useState(initialSelectedArtists);
    
    const updateArtists = artistList => {
        setArtists(artistList);
    }
    
    const artistsContext = {
        artists,
        setArtists,
        selectedArtists,
        setSelectedArtists,
        updateArtists,
    };
    return <Context.Provider value={artistsContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;

Provider.propTypes = {
    artists: PropTypes.array
};

Provider.defaultProps = {
    artists: [],
}