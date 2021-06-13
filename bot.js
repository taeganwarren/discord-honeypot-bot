require('dotenv').config()

const { Client, MessageCollector, RichEmbed } = require('discord.js');
const bot = new Client({ disableEveryone: true });

let active_collectors = [];
let guild;

bot.on('ready', async () => {
    console.log(`Logged in as: ${bot.user.tag}!`);
    guild = await bot.guilds.get(process.env.GUILD);
});

bot.on('message', async (message) => {
    if (message.author.bot) return;
    const filter = (m) => m.author.id === message.author.id;
    if (message.channel.type === 'dm') {
        if (active_collectors.includes(message.channel.id)) {
            return;
        } else {
            active_collectors.push(message.channel.id);
            const collector = new MessageCollector(message.channel, filter, {
                idle: 10000
            });
            collector.collected.set(message.id, message);
            collector.on('end', (collected) => {
                active_collectors.splice(active_collectors.indexOf(message.channel.id), 1);
                const notify_channel = guild.channels.get(process.env.CHANNEL);
                const ban_channel = guild.channels.get(process.env.BAN_CHANNEL);
                const messages = collected.array();
                let dm_embed = new RichEmbed()
                    .setTitle(message.author.username)
                    .setThumbnail(message.author.avatarURL)
                    .addField('User ID', message.author.id);
                let messages_string = '';
                messages.forEach( (message) => {
                    messages_string = messages_string + message.content + '\n';
                });
                dm_embed.addField('Message(s)', messages_string);
                notify_channel.send(dm_embed);
                ban_channel.send(`?ban ${message.author.id}`);
            });
        }
    }
});

bot.login(process.env.TOKEN);
