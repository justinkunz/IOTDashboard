# IOT Dashboard

Simple React/Node IOT Dashboard I made for my house. Displays **Current News**, **Weather**, **Time** & **Wifi Speed**. Made to run on a Raspberry Pi. This dashboard also sends SMS alerts whenever Wifi Strength falls under a specified threshold _(future enhancements might tweet at Spectrum, because fuck that)_

## Set Up

1. Clone this repo and install dependancies by running `npm install`
2. Create a `network.log` file at the root of the project _(historic network speeds will be stored here)_
3. Create an account with the following services:
   - [News API](https://newsapi.org/register)
   - [Open Weather API](https://openweathermap.org/api)
   - [Twilio](https://www.twilio.com)
4. Follow the steps to get a token from [fast.com](https://fast.com) following the instructions found on the `fast-speedtest-api` npm package FAQs [here](https://www.npmjs.com/package/fast-speedtest-api)
5. Run `cp .env.example .env` and fill the `.env` file with the content gathered above.
6. Lattitude & Longitude for weather location & network speed notification settings can be set in [`config.json`](./config.json). Wifi speed ranges _(for determining wifi logo color)_ can be configured in the [`wifi.config.json`](./client/src/wifi.config.json) file inside of `client/src`
7. Start the app by running `npm start`. App should now be running at `http://localhost:3000`
