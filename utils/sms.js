const { SMS_ID, SMS_TOKEN, SMS_FROM_NUM, DEV_NUM_1, DEV_NUM_2 } = process.env;
const client = require("twilio")(SMS_ID, SMS_TOKEN);

const sendMessage = async (body) => {
  // Can't bundle - Twilio gets mad. "Too many requests"
  await client.messages.create({
    body,
    from: SMS_FROM_NUM,
    to: DEV_NUM_1,
  });

  await client.messages.create({
    body,
    from: SMS_FROM_NUM,
    to: DEV_NUM_2,
  });
};

module.exports = { sendMessage };
