import axios from "axios";
import CONSTANTS from "../constants";

const requestHandler = async (endpoint) => {
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getWeather = () => requestHandler(CONSTANTS.ENDPOINTS.WEATHER);
export const getNews = () => requestHandler(CONSTANTS.ENDPOINTS.NEWS);
export const getNetworkSpeed = () => requestHandler(CONSTANTS.ENDPOINTS.NETWORK);
