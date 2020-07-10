const FastSpeedtest = require("fast-speedtest-api");
const moment = require("moment");
const { appendFileSync, readFileSync } = require("fs");
const { alertThreshold, maxFrequencyMinutes } = require("../config.json").network;
const { sms } = require("../utils");
const { SPEEDTEST_TOKEN } = process.env;

const getNetworkSpeed = async (req, res) => {
  try {
    let speedtest = new FastSpeedtest({
      token: SPEEDTEST_TOKEN,
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.Mbps,
    });

    const speed = await speedtest.getSpeed();
    if (speed < alertThreshold) {
      const logs = readFileSync("./network.log", "utf-8")
        .split("\n")
        .map((log) => log.split(" - "))
        .reverse();

      const [lastAlert] = logs.find((log) => log[1] === "ALERT SENT") || [];

      const sendAlert = lastAlert
        ? moment().diff(moment(lastAlert), "m") > maxFrequencyMinutes
        : true;

      console.log({ lastAlert, sendAlert });
      if (sendAlert) {
        console.log("Sending slow network alert");
        await sms.sendMessage(`SLOW NETWORK ALERT:\n\nNetwork Speed: ${Math.round(speed)}Mbps`);
        appendFileSync("./network.log", `\n${moment().toISOString()} - ALERT SENT`);
      }
    

    appendFileSync("./network.log", `\n${moment().format("MM/DD/YYYY hh:mm:ss")} - ${speed} Mbps`);
    res.json({ speed });
  } catch (err) {
    console.log(err);
    res.json({ speed: "Error" });
  }
};

module.exports = { getNetworkSpeed };
