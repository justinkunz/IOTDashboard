import React, { useState, useEffect } from "react";
import * as API from "../api";
import goodImage from "../assets/wifi/good.png";
import okImage from "../assets/wifi/ok.png";
import badImage from "../assets/wifi/bad.png";
import { okMin, goodMin } from "../wifi.config.json";

const checkWifiStrength = async () => {
  const { speed } = await API.getNetworkSpeed();
  return Math.round(speed);
};

export default function WifiStrength(props) {
  const [speed, setSpeed] = useState({});

  useEffect(() => {
    const setCurrentStrength = async () => {
      const current = await checkWifiStrength();
      let image;
      if (current < okMin) {
        image = badImage;
      } else if (current > goodMin) {
        image = goodImage;
      } else {
        image = okImage;
      }
      setSpeed({ current, image });
    };
    setCurrentStrength();
    setInterval(setCurrentStrength, 180000); // Every 3 minutes
  }, [setSpeed]);

  const styles = {
    wifiLabel: {
      fontSize: 80,
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    image: {
      height: 150,
    },
  };

  return (
    <div style={props.style}>
      {speed.current ? (
        <div style={styles.wifiLabel}>
          <img style={styles.image} src={speed.image} alt="Wifi speed" />
          <div>{speed.current} Mbps</div>
        </div>
      ) : (
        <div style={styles.wifiLabel}>. . .</div>
      )}
    </div>
  );
}
