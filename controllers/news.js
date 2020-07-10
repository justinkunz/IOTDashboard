const axios = require("axios");
const { NEWS_API_KEY } = process.env;

const getNews = async (req, res) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
  );
  res.json(data);
};

module.exports = { getNews };
