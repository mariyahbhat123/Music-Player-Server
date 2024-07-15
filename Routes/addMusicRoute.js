const express = require("express");
const addMusic = require("../Models/addMusic");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (rq, file, cb) {
    if (file.fieldname === "songs") {
      cb(null, "../audios");
    }
    if (file.fieldname === "image") {
      cb(null, "../images");
    }
  },
  filename: (req, file, cb) => {
    console.log(file.fieldname);
    if (file.fieldname === "songs") {
      cb(
        null,
        Date.now().toString(16) + "-" + file.originalname.slice(0.13) + ".mp3"
      );
    }
    if (file.fieldname === "image") {
      cb(null, Date.now().toString(16) + "-" + file.originalname);
    }

    console.log(file.originalname);
  },
});

let upload = multer({
  storage,
});

router.post(
  "/addMusic",
  upload.any(),

  async (req, res) => {
    try {
      console.log(req.files[1].filename);
      // if (!singer && !name) {
      //   return res.status(400).json({ msg: "Please enter all fields" });
      // }
      await addMusic.create({
        song: req.files[0].filename,
        singer: req.body.singer,
        name: req.body.name,
        image: req.files[1].filename,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/addedMusic", async (req, res) => {
  try {
    const songs = await addMusic.find({});
    return res.send(songs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/playMusic/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const song = await addMusic.findById({ _id: id });
    return res.send(song);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
