const mongoose = require("mongoose");
const url = "mongodb://0.0.0.0:27017/";

const db = () => {
  try {
    mongoose.connect(url, { dbName: "musicPlayerMern" });
    console.log("successfully connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
