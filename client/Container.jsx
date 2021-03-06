import React, { Component } from "react";
import Banner from "./Banner.jsx";
import Festivals from "./Festivals.jsx";
import Playlist from "./Playlist.jsx";
import YourEvents from "./YourEvents.jsx";
import styles from "./app.scss";

export class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  }

  render() {
    return (
      <div className="Container">
        <Banner code={code}/>
        <Festivals code={code}/>
        <Playlist code={code}/>
        <YourEvents code={code}/>
      </div>
    );
  }
}

export default Container;
