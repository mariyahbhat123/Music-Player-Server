const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addMusicSchema = new Schema(
  { singer: String, song: String, name: String, image: String },
  { collection: "music" }
);

const addMusic = model("addMusic", addMusicSchema);
module.exports = addMusic;
