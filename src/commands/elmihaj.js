module.exports = async (message, args) => {
    message.react('546787286222635044');
    message.channel.send({files: ["src/commands/images/elmihaj.jpg"]});
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play('src/commands/soundfiles/hej.mp3');
        } else {
        message.reply('You need to join a voice channel first!');
      }
}