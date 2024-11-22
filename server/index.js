require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const dbjs = require("./db");
const port = 5000;
const path = require("path");

const userRoute = require("./routes/userapi");

const _dirname = path.resolve();

app.use(bodyparser.json());
app.use(cors());
app.use("/api/user", userRoute);



app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("server is running");
});
