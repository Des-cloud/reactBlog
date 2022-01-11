const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}));


// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.status(200).json({ message: "Root: Hello, world!" });
});

const editRouter = require("./routes/journal/edit");
app.use("/edit", editRouter);

const journalsRouter = require("./routes/journal/journal");
app.use("/journals", journalsRouter);

const users = require("./routes/auth/users");
app.use("/users", users);

module.exports = app;
