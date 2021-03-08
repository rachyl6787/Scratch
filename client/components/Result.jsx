import React, { createContext, useState } from 'react';
import { Context } from './Context.jsx';

export default function Result(props) {

    const handleSubmit = () => {
        fetch(`api/skapi/?id=${props.id}`)
            .then(data => data.json())
            .then(function (json) {
                let payload = json['artists'];
                setArtists(payload);
            })
    }

    return (
        <div className="Result">
            <form className="Result_Form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {props.displayName}
                <input
                    className="Result_Button"
                    type="submit"
                    value="Build Playlist"
                />
            </form>
        </div>
    )
}