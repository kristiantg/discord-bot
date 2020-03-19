const eightball = ['Ja da, din luder!', 
'Ask again later.',
'Cannot predict now.',
'Better not tell you now.',
'Concentrate and ask again.',
'It is certain.',
'It is decidedly so.',
'Nej, din luder.',
'Bund en øl.'
]

module.exports = async (message, args) => {
    if (!args.length) return;
    const i = Math.floor(Math.random() * eightball.length);
    const reply = eightball[i];
    await message.channel.send(`${message.author} ${reply} 😸`)
};