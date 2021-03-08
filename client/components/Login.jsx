import React, { useState, useEffect } from 'react';

export default function Login() {


return (
    <div className="Login">
        <h1>Login to make a playlist!</h1>
        <form id='Spotify' method="GET" action="/login">
        <input
            className="Login_Button"
            type="submit"
            id="login"
            value="Login with Spotify"
        />
        </form>
    </div>
);
}