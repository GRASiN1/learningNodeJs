const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.reply("Hi from bot");
});

client.on('interactionCreate', (interaction) => {
    interaction.reply('Pong');
})

client.login('MTIyNTgyMTIxODY4MzIyODI1Mg.GRcfFh.rZTEM1TijtshaDLw5bxsUndVTcf2sSKV5GBdCA');
