const help = require("./help");
const eightball = require("./eightball");
const hej = require("./hej");
const play = require("./play");
const clear = require("./clear");
const skip = require("./play");
const stop = require("./stop");
const pause = require("./play");
const resume = require("./play");
const queue = require("./play");
const elmihaj = require("./elmihaj");

const commands = {
  help,
  "8ball": eightball,
  hej,
  play,
  clear,
  skip,
  stop,
  queue,
  pause,
  resume,
  elmihaj,
};

module.exports = async (message) => {
  const args = message.content.split(" ");

  if (args.length == 0 || args[0].charAt(0) !== "!") return;
  const command = args.shift().substr(1);

  if (command in commands) {
    commands[command](message, args);
  }

  console.log(command);
};
