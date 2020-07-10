require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const app = express();
const { PORT } = process.env;

app.use([express.urlencoded({ extended: true }), express.json()]);
app.use("/api", routes);

app.listen(PORT || 7070);
