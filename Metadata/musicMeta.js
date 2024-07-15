const mm = require("music-metadata");
const util = require("util");

const musicMeta = () => {
  (async () => {
    try {
      const metadata = await mm.parseFile("../Audios");
      console.log(metadata);
    } catch (error) {
      console.error(error.message);
    }
  })();
};

module.exports = musicMeta;
