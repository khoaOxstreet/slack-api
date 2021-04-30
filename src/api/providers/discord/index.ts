import Discord from 'discord.js';
const client: any = new Discord.Client();
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'ODM2ODQ5Mjk0NTA1OTM0ODc4.YIj-ow.XgrWuv-mQG46CJrk4KJRdcnBdOg';
import SlashCommand, { commandsInitalization, OptionResponse, convertToObject } from './slash-command';
import { getPriceFromCache, getPricesFromCache, getOffersFromCache, getOfferFromCache } from '../../cache';
const GUILD_ID = process.env.GUILD_ID || '836528929829027850'; //'836528929829027850'; // SERVER WIDGET

import { TestData, buildTableMarkdownSection } from './discord-text';

const slashCommand = new SlashCommand(client, GUILD_ID);

client.on('ready', async () => {
  console.log('Client is ready');
  slashCommand.buildCommands(commandsInitalization);
})

client.on('message', (msg: any) => {
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
    };break;
    case 'rebuild_commands': {
      slashCommand.rebuildCommands(commandsInitalization);
      msg.reply('pong');
    };break;
  }
});

/* tslint:disable */
client.ws.on('INTERACTION_CREATE' as any, async (interaction: any) => {
  try {

    const { options = [], name } = interaction.data;
    const command = name.toLowerCase();
    console.log('command is ', command);
    console.log('data is', options);
    console.log('interaction', interaction);
    switch(command) {
      case 'testing': {
        console.log('yeah pong');
        slashCommand.reply(interaction, buildTableMarkdownSection(TestData.table));
      };break;
      case 'prices': {
        const { id, token } = interaction as any;
        const data = convertToObject(options);
        const { sku, currency } = data;
        // slashCommand.reply(interaction, 'ssss');
        const skuNumber = sku.replace(/-/g, ' ').trim().toUpperCase();
        const result = await getPricesFromCache(skuNumber, currency);
        const resMarkdown = `Prices ${options.map((e: any) => `${e.name} = ${e.value}`).join(' & ')}\n${buildTableMarkdownSection(result)}`;
        slashCommand.reply({ id, token }, resMarkdown);
      };break;
      case 'offers': {
        const data = convertToObject(options);
        const { sku, currency } = data;
        const skuNumber = sku.replace(/-/g, ' ').trim().toUpperCase();
        const result = await getOffersFromCache(skuNumber, currency);
        const resMarkdown = `Offers ${options.map((e: any) => `${e.name} = ${e.value}`).join(' & ')}\n${buildTableMarkdownSection(result)}`;
        slashCommand.reply(interaction, resMarkdown);
      };break;
      case 'price': {
        const data = convertToObject(options);
        const { sku, size, currency } = data;
        const skuNumber = sku.replace(/-/g, ' ').trim().toUpperCase();
        const result = await getPriceFromCache(skuNumber, size, currency);
        const resMarkdown = `Price ${options.map((e: any) => `${e.name} = ${e.value}`).join(' & ')}\n${buildTableMarkdownSection([result])}`;
        slashCommand.reply(interaction, resMarkdown);
      };break;
      case 'offer': {
        const data = convertToObject(options);
        const { sku, size, currency } = data;
        const skuNumber = sku.replace(/-/g, ' ').trim().toUpperCase();
        const result = await getOfferFromCache(skuNumber, size, currency);
        const resMarkdown = `Offer ${options.map((e: any) => `${e.name} = ${e.value}`).join(' & ')}\n${buildTableMarkdownSection([result])}`;
        slashCommand.reply(interaction, resMarkdown);
      };break;
  
    }
  } catch (err) {
    slashCommand.reply(interaction, `Requested failed timeout! Could u try again!`);
    console.log('ERROR', err);
  }
});


client.login(DISCORD_TOKEN);
