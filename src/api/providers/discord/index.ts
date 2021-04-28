import Discord from 'discord.js';
const client = new Discord.Client();
const commands = new Discord.Collection();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'ODM2ODQ5Mjk0NTA1OTM0ODc4.YIj-ow.XgrWuv-mQG46CJrk4KJRdcnBdOg';
import SlashCommand, { commandsInitalization } from './slash-command';

const GUILD_ID = '836528929829027850'; // SERVER WIDGET

import { TestData, buildTableMarkdownSection } from './discord-text';

const slashCommand = new SlashCommand(client, '');

client.on('ready', async () => {
  console.log('Client is ready');
  slashCommand.buildCommands(commandsInitalization);
})

commands.set('testing', 'testing');
client.on('message', msg => {
  console.log('message is', msg.content);
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  switch(msg.content) {
    case 'remove_commands': {
      slashCommand.removeAllCommands();
      msg.reply('pong');
    }; break;
    case 'build_commands': {
      slashCommand.buildCommands(commandsInitalization);
      msg.reply('pong');
    }
    case 'rebuild_commands': {
      slashCommand.rebuildCommands(commandsInitalization);
      msg.reply('pong');
    }
  }
});

client.ws.on('INTERACTION_CREATE' as any, async (interaction: any) => {
  const { options = [], name } = interaction.data;
  const command = name.toLowerCase();
  console.log('command is ', command);
  console.log('data is', options);
  switch(command) {
    case 'testing': {
      console.log('yeah pong');
      slashCommand.reply(interaction, buildTableMarkdownSection(TestData.table));
    }
    case 'prices': {
      slashCommand.reply(interaction, `You requested input data ${options.map((e: any) => `${e.name} = ${e.value}`).join(' & ')}`);
    }
  }
});


client.login(DISCORD_TOKEN);
