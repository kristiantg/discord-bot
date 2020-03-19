module.exports = async (message, args) => {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play('src/commands/soundfiles/hej.mp3');
        } else {
        message.reply('You need to join a voice channel first!');
      }
}