#!/usr/bin/env node
const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3001;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URI, options)
  .then((res) => {
    console.log("Connected to database");
    server.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
