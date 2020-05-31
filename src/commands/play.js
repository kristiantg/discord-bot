const ytdl = require('ytdl-core-discord');
const ytsr = require('ytsr');
const queue = require('./queue');

async function play(song, message) {

    if(queue.length != 0){
        dispatcher = connection.play(await ytdl(song.url), {type: 'opus'});
        dispatcher.on('finish', () => {
            queue.shift();
            play(queue[0]);
        })
        dispatcher.setVolume(0.09);
    }else{
        dispatcher.destroy();
    }
}

async function pause(message) {
	dispatcher.pause();
	if (queue.length == 0) return message.channel.send('There is no song that I could pause!');
}

async function stop() {
    dispatcher.destroy();
    while (queue.length != 0){
        queue.shift();
    }
}

async function resume() {
	dispatcher.resume();
}

async function skip(message) {
    message.channel.send(queue[0].title + ' has been skipped!')
    queue.shift();
    play(queue[0]);
}

async function getQueue() {
    queueString = 'Queue: ';
 
    for (index = 0; index < queue.length; index++) { 
        queueString = queueString + queue[index].title;
        if(index == queue.length-1){
            queueString = queueString + '.';
        }else{
            queueString = queueString + ', ';
        }
        console.log(queue);
    } 

    return queueString;
}

async function getSong(message) {
    let searchTerm = message.toString().replace('!play ', '');
        const { title, link : url } = (await ytsr(searchTerm, { limit: 1 })).items[0];
        return {title, url };
}

module.exports = async (message, args) => {
    if(message.member.voice.channel){
        connection = await message.member.voice.channel.join();
        if(message.content.toString().includes('!play')){
            message.react('▶️'); 
            queue.push(await getSong(message));
            if(queue.length == 1){
                await play(queue[0], connection);
            }else{
                message.channel.send(message.toString().replace('!play ', '') + ' has been added to the queue!');
            }
        }
    
        if(message.content.toString() == '!skip'){
            skip(message);
        }
    
        if(message.content.toString() == '!pause'){
            message.react('⏹');
            pause(message);
        }

        if(message.content.toString() == '!stop'){
            message.react('⏹');
            stop();
        }

        if(message.content.toString() == '!resume'){
            resume();
        }

        if(message.content.toString() == '!queue'){
            if(queue.length == 0){
                message.channel.send('Queue is empty.');
            }else{
                message.channel.send(await getQueue());
            }
        }

    }else{
        return message.channel.send('You need to be in a voice channel to play music!');
    }
}