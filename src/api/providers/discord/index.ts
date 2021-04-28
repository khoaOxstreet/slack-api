import Discord from 'discord.js';
const client = new Discord.Client();
const commands = new Discord.Collection();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'ODM2ODQ5Mjk0NTA1OTM0ODc4.YIj-ow.XgrWuv-mQG46CJrk4KJRdcnBdOg';

const GUILD_ID = '836528929829027850'; // SERVER WIDGET

import { TestData, buildTableMarkdownSection } from './discord-text';


const getApp = (guildId: string) => {
  const userId = client && client.user ? client.user.id : '';
  const app = (client as any).api.applications(userId);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
}

// guildId = '' getCommands of application (not Group)
const getCommands = async (guildId: string) => {
  const commands = await getApp(guildId).commands.get();
  return commands;
}

interface CommandOptionType {
  name: string;
  description: string;
  required: boolean;
  type: number;  // 3 = string
}

interface CommandType {
  name: string;
  description: string;
  options?: CommandOptionType[]
}

const postCommands = async (guildId: string, data: CommandType) => {
  await getApp(guildId).commands.post({
    data
  })
}

const commandsInitalization: CommandType[] = [
  {
    name: 'testing',
    description: 'Testing'
  },
  {
    name: 'prices',
    description: 'Get Prices by Sku and Currency',
    options: [
      {
        name: 'sku',
        description: 'Sku number',
        required: true,
        type: 3
      },
      {
        name: 'currency',
        description: 'Currency',
        required: false,
        type: 3
      }
    ]
  }
];

const initCommands = async (guildId: string) => {
  const existingCommands = await getCommands(guildId);
  console.log('existing commands', existingCommands);
  const commandNeedToBeAdded = commandsInitalization.filter(e => !existingCommands.find((i: any) => i.name === e.name));
  console.log('commands need to be added', commandNeedToBeAdded);
  await Promise.all(commandNeedToBeAdded.map(e => postCommands(guildId, e)));
  console.log('initCommands DONE');
}

const removeCommandById = async (guildId: string, commandId: string) => {
  await getApp(guildId).commands(commandId).delete();
}

const removeAllCommands = async (guildId: string) => {
  const commands = await getCommands(guildId);
  await Promise.all(commands.map((e: any) => removeCommandById(guildId, e.id)))
}

const replyToSlashCommand = async (interaction: any, content: string) => {
  (client as any).api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content
      }
    }
  })
}


client.on('ready', async () => {
  console.log('Client is ready');
  // const commands = await getCommands('');
  // console.log('COMMANDS', commands);
  await initCommands('');
  // await removeAllCommands('');
})

commands.set('testing', 'testing');
client.on('message', msg => {
  console.log('message is', msg.content);
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  switch(msg.content) {
    case 'remove_commands': {
      removeAllCommands('');
      msg.reply('pong');
    }; break;
    case 'init_commands': {
      initCommands('');
      msg.reply('pong');
    }
  }
});

client.ws.on('INTERACTION_CREATE' as any, async (interaction: any) => {
  console.log('command is', interaction.data);
  const command = interaction.data.name.toLowerCase();
  console.log('command is ', command);
  switch(command) {
    case 'testing': {
      console.log('yeah pong');
      replyToSlashCommand(interaction, buildTableMarkdownSection(TestData.table));
    }
  }
});


client.login(DISCORD_TOKEN);
