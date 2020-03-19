const ytdl = require('ytdl-core-discord');
const ytsr = require('ytsr');
 
async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
}


module.exports = async (message, args, queue) => {
    if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        if (message.content.includes('https://www.youtube.com/watch?')){
          connection.play(ytdl(message.toString().replace('!play', ''), { filter: 'audioonly' }));
          message.react('🍊');
        }else{
          let searchTerm = message.toString().replace('!play ', '');
          let url = (await ytsr(searchTerm, { limit: '1' })).items[0].link;
          play(connection, url)
        }
    } else {
        message.reply('You need to join a voice channel first!');
    }
}