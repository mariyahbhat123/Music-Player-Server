const express = require("express");
const cors = require("cors");
const PORT = 5000;
const http = require("http");
const db = require("../MongoDb/db");
const musicMeta = require("../Metadata/musicMeta");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
    // "http://localhost:3000",
    // "http://localhost:3006"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/audios", express.static("../audios"));
app.use("/images", express.static("../images"));

app.use("/api", require("../Routes/adminRoute"));
app.use("/api", require("../Routes/addMusicRoute"));

app.listen(PORT, (req, res) => {
  db((err) => {
    if (!err) {
      console.log("Listening to DB");
    } else {
      console.log(err);
    }
  });
  console.log("Successfully connected to PORT", PORT);
});
