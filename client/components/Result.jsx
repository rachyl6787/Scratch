import React, { useState, useEffect } from 'react';

export default function Result (props) {

   const handleSubmit = () => {
        fetch(`api/skapi/?id=${props.id}`)
        .then(data => data.json())
        .then(data => console.log(data))
    }

    return (
        <div className="Result">
            <form className="Result_Form" onSubmit={e => { e.preventDefault(); handleSubmit();}}>
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