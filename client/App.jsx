import React, { Component } from "react";
import Container from "./Container.jsx";
import Login from "./Login.jsx";
import styles from "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (document.cookie.indexOf("verified=true") === -1) {
      return (
        <div>
          <Login/>
        </div>
      );
    } else {
      return (
        <div>
          <Container />
        </div>
      );
    }
  }
}

export default App;
