const ytdl = require("ytdl-core-discord");
const ytsr = require("ytsr");
const queue = require("./queue");
const isPlaying = false;

async function play(song, message) {
  if (isPlaying) {
    console.log("hej");
  }
  if (queue.length != 0 && !isPlaying) {
    isPlaying = true;
    dispatcher = connection.play(
      await ytdl(song.url, { filter: "audioonly" }),
      { type: "opus" }
    );
    console.log(queue);
    queue.shift();
    dispatcher.on("finish", () => {
      isPlaying = false;
      play(queue[0]);
    });
    //dispatcher.setVolume(0.09);
  } else {
    dispatcher.destroy();
  }
}

async function pause(message) {
  dispatcher.pause();
}

async function clear() {
  while (queue.length != 0) {
    queue.shift();
  }
}

async function resume() {
  dispatcher.resume();
}

async function skip(message) {
  isPlaying = false;
  message.channel.send("Skipped!");
  play(queue[0]);
}

async function getQueue() {
  queueString = "Queue: \n";

  for (index = 0; index < queue.length; index++) {
    queueString =
      queueString + queue[index].title + " ```" + queue[index].url + "```\n";
  }

  console.log(queue);

  return queueString;
}

async function getSong(message) {
  let searchTerm = message.toString().replace("!play ", "");
  const { title, url } = (await ytsr(searchTerm, { limit: 1 })).items[0];
  console.log(url);
  return { title, url };
}

module.exports = async (message, args) => {
  if (message.member.voice.channel) {
    connection = await message.member.voice.channel.join();
    if (message.content.toString().includes("!play")) {
      message.react("▶️");
      let song = await getSong(message);
      queue.push(song);
      if (queue.length == 1 && !isPlaying) {
        await play(queue[0], connection);
      } else {
        message.channel.send(song.url + "has been added to the queue.");
      }
    }

    if (message.content.toString() == "!skip") {
      skip(message);
    }

    if (message.content.toString() == "!pause") {
      message.react("⏹");
      pause(message);
    }

    if (message.content.toString() == "!resume") {
      resume();
    }

    if (message.content.toString() == "!clear") {
      clear();
    }

    if (message.content.toString() == "!queue") {
      if (queue.length == 0) {
        message.channel.send("Queue is empty.");
      } else {
        message.channel.send(await getQueue());
      }
    }
  } else {
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  }
};
