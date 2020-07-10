import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Clock(props) {
  const getTime = () => moment().format("hh:mm:ss A");

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    // Refresh time every 1s
    setInterval(() => setTime(getTime()), 1000);
  }, 1000);

  const styles = {
    time: {
      fontSize: 105,
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  };
  return (
    <div style={props.style}>
      <div style={styles.time}>{time}</div>
    </div>
  );
}
