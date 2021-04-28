import Discord from 'discord.js';
const client = new Discord.Client();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'ODM2ODQ5Mjk0NTA1OTM0ODc4.YIj-ow.XgrWuv-mQG46CJrk4KJRdcnBdOg';

client.on('ready', () => {
  console.log('Client is ready');
})


client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(DISCORD_TOKEN);