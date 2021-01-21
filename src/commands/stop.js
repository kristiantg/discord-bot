const clear = require("./clear");
let isPlaying = require("./isPlaying");

module.exports = async function stop() {
  isPlaying = false;
  dispatcher.destroy();
  clear();
};
