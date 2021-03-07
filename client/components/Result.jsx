import React, { useState, useEffect } from 'react';

export default function Result (props) {

   const handleSubmit = () => {
        fetch(`api/skapi/?id=${props.id}`)
        .then(data => data.json())
        .then(data => console.log(data))
    }

    return (
        <div className="Result">
            <form onSubmit={e => { e.preventDefault(); handleSubmit();}}>
            <p>{props.displayName}</p>
            <input
              className="Result_Button"
              type="submit"
              value="Create Playlist"
            />
            </form>
        </div>
    )
}