const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./schemas/user");

app.use(bodyParser.json());

dotenv.config();

const link_database = process.env.DATABASE_LINK;

mongoose
  .connect(link_database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
