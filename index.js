const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/router");
require("dotenv").config();
mongoose
  .connect("mongodb+srv://rishi:mom@cluster0.gejqrey.mongodb.net/YOMOM")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(bodyParser.json());
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
