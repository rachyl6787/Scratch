import React, { useState, useEffect } from 'react';

export default function Login() {
  return (
    <div className="Login">
      <h1>Welcome to __card!</h1>
      <h2>Login to make a playlist.</h2>
      <form id="Spotify" method="GET" action="/login">
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
