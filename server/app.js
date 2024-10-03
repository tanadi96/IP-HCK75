if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const router = require("./Routers/index");
const express = require("express");
const app = express();

const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
module.exports = app

