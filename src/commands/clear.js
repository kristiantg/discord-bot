const queue = require("./queue");

module.exports = async function clear() {
  while (queue.length != 0) {
    queue.shift();
  }
};
