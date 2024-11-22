require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const dbjs = require("./db");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/userapi");

app.use(bodyparser.json());
app.use(cors());
app.use("/api/user", userRoute);
app.listen(port, () => {
  console.log("server is running");
});

app.get("/", (req, res) => {
  res.send("Hello");
});
