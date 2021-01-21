const Discord = require("discord.js");
const commandHandler = require("./commands");

require("dotenv").config();

const client = new Discord.Client();

client.once("ready", () => {
  console.log("_ready");
});

client.on("message", commandHandler);
client.login("Njg4MDg2MTM4Nzk5NTIxODE1.XmvMJw.1aZtPn-G_QH-Kbq4Z5EUTiYZBbg");
