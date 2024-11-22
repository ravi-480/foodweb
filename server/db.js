const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://kumawatravi9426:HtMByy6zAcGRvAhQ@cluster0.hiscg.mongodb.net/recipe-user")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e);
  });

  module.exports = mongoose;