import React, { useContext, useState, useEffect } from 'react';

export default function Artist(props) {


    return (
        <div className="Playlist">
            <form className="Artist_Form">
            {props.name}
            </form>
        </div>
    );
}