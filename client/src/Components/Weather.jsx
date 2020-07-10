import React, { useState, useEffect } from "react";
import moment from "moment";
import * as API from "../api";

// Kelvin to F converter
const kToF = (k) => Math.round(((k - 273.15) * 9) / 5 + 32);

const getWeatherData = async () => {
  const data = await API.getWeather();
  const current = {
    weather: data.current.weather[0],
    temp: kToF(data.current.temp),
    image: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
  };
  const hourly = data.hourly.map((h) => {
    return {
      time: moment(h.dt * 1000).format("hh:mm a"),
      weather: h.weather[0],
      temp: kToF(h.temp),
      image: `https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`,
    };
  });

  // First hour is also current hour
  hourly.shift();

  return { current, hourly };
};

export default function Weather(props) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getWeatherData();
      setWeather(weather);
    };
    fetchWeather();

    // Refresh weather every 5 minutes
    setTimeout(fetchWeather, 500000);
  }, []);
  const styles = {
    currentWrapper: {
      textTransform: "capitalize",
      position: "relative",
    },
    hourlyWrapper: {},
    currentIcon: {
      height: 175,
    },
    currentLabel: {
      fontSize: 45,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      fontWeight: 700,
    },
    currentTemp: {
      position: "absolute",
      top: 10,
      right: 20,
      fontSize: 40,
      fontWeight: 700,
    },
    hourIcon: {
      height: 70,
    },
    hourlyWrapper: {
      margin: "0 auto",
    },
    td: {
      fontSize: 28,
      fontWeight: 300,
      padding: "0 10px",
    },
    tr: {
      lineHeight: 0,
    },
    hourWeatherLabel: {
      textTransform: "capitalize",
    },
  };
  return (
    <div style={props.style}>
      {weather.current && weather.hourly && (
        <div>
          <div style={styles.currentWrapper}>
            <img style={styles.currentIcon} src={weather.current.image} />
            <div style={styles.currentLabel}>{weather.current.weather.description}</div>
            <div style={styles.currentTemp}>{weather.current.temp} &deg; F</div>
          </div>
          <table style={styles.hourlyWrapper}>
            <tbody>
              {weather.hourly.map((hour, index) => {
                return (
                  <tr key={index} style={styles.tr}>
                    <td>
                      <img
                        style={styles.hourIcon}
                        src={hour.image}
                        alt={hour.weather.description}
                      />
                    </td>
                    <td style={styles.td}>{hour.time}</td>
                    <td style={{ ...styles.td, ...styles.hourWeatherLabel }}>
                      {hour.weather.description}
                    </td>
                    <td style={styles.td}>{hour.temp} &deg; F</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
