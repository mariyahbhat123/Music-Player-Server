const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    adminName: String,
    adminEmail: String,
    password: String,
  },
  { collection: "admin" }
);

const adminModel = model("adminModel", adminSchema);
module.exports = adminModel;
