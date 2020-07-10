const axios = require("axios");
const { OPEN_WEATHER_API_KEY } = process.env;
const { lat, lon } = require("../config.json").weather;

const getWeather = async (req, res) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${OPEN_WEATHER_API_KEY}`
  );
  res.json(data);
};

module.exports = { getWeather };
