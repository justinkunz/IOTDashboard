const router = require("express").Router();
const { networkController, newsController, weatherController } = require("../controllers");

router.route("/network").get(networkController.getNetworkSpeed);
router.route("/news").get(newsController.getNews);
router.route("/weather").get(weatherController.getWeather);

module.exports = router;
