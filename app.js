if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const router = require("./Routers/index");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
