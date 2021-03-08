import React, { createContext, useState } from 'react';

export default function Result(props) {

    const handleSubmit = () => {
        fetch(`api/skapi/?id=${props.id}`)
            .then(data => data.json())
            .then(function (json) {
                let payload = json['artists'];
                console.log(payload);
                props.updateArtists(payload);
            })
        .then(document.cookie = `artistID=${props.id}`);
    }

    return (
        <div className="Result">
            <form className="Result_Form" onClick={e => { e.preventDefault(); handleSubmit(); }}>
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