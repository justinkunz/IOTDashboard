import React from "react";
import { News, Weather, Clock, Wifi } from "./Components";

function App() {
  const styles = {
    wrapper: {
      height: "100vh",
      fontFamily: "'News Cycle', sans-serif",
      backgroundColor: "#162050",
    },
    news: {
      width: "60vw",
      height: "80vh",
      position: "relative",
      backgroundColor: "#191616",
      float: "left",
      boxShadow: "-8px -8px 17px 10px #000000",
      borderRadius: "0 0 10px",
      zIndex: 999,
    },
    weather: {
      float: "left",
      width: "40vw",
      height: "80vh",
      position: "relative",
      textAlign: "center",
      backgroundColor: "#162050",
      color: "#e8e8e8",
      overflow: "hidden",
      fontFamily: `'Encode Sans', sans-serif`,
    },
    clock: {
      backgroundColor: "#20203a",
      height: "20vh",
      float: "left",
      width: "50%",
      borderRadius: "10px 10px 0 0",
      fontFamily: `'Encode Sans', sans-serif`,
    },
    wifi: {
      backgroundColor: "#3b4479",
      height: "20vh",
      float: "left",
      width: "50%",
      borderRadius: "10px 10px 0 0",
      fontFamily: `'Dosis', sans-serif`,
    },
  };
  return (
    <div style={styles.wrapper}>
      <News style={styles.news} />
      <Weather style={styles.weather} />
      <Clock style={styles.clock} />
      <Wifi style={styles.wifi} />
    </div>
  );
}

export default App;
