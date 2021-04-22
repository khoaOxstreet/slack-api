
// const { WebClient } = require('@slack/web-api');
import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { SlackEventType, BotInfoType } from '../type/slack';
import { buildTableMarkdownSection, buildBlockMarkdownSection, TestData } from './slack-lib';
const SLACK_TOKEN = process.env.SLACK_TOKEN || 'xoxb-751028319104-1982052749219-7zdPPHYG3MB0tQzxQjyxfc0E';
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || 'cf30deca6078a4bd4ba9f7237717c577';

export const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);

const webClient = new WebClient(SLACK_TOKEN);

// START ONCE IN RUNNING TIME
let BOT_INFO: BotInfoType;
const getBotInfo = async (): Promise<BotInfoType | null> => {
  try {
    const botInfo: any = await webClient.apiCall('auth.test');
    
    console.log('BOT INFO', botInfo);
    BOT_INFO = botInfo;
    return botInfo;
  } catch (error) {
    return null;
  }
}
getBotInfo();

slackEvents.on('message', async (event: SlackEventType) => {
  try {
    console.log("I got a this message in this channel", JSON.stringify(event));
    // const bot = await getBotInfo();
    const { user, channel, text } = event;
    if (BOT_INFO && BOT_INFO['user_id'] !== user) {
      // Dont need to process request from our Bot
      if (text.includes(BOT_INFO.user_id)) {
        // someone need bot help
        sendMessage(channel, `How can i help you ?`);
      } else {
        // handle more cases here
      }
    }
  } catch (e) {
    console.log('Receive message error', e);
  }
});

slackEvents.on('error', (error) => {
  console.log('error here', error);
  console.log(error.name); // TypeError
});


export const sendMessage = async (channel: string = 'testbot', text: string) => {
  await webClient.chat.postMessage({
    text,
    channel,
  });
  console.log('Sent succss');
}

export const sendMarkdownMessage = async (channel: string = 'testbot') => {
  await webClient.chat.postMessage({
    channel,
    text: '',
    blocks: buildTableMarkdownSection(TestData.table)
  });
}

export const sendMarkDownTableMessage = async (channel: string = 'testbot', title: string, data: any[]) => {
	await webClient.chat.postMessage({
    channel,
    text: '',
    blocks: [
			buildBlockMarkdownSection(title),
			...buildTableMarkdownSection(data)
		]
  });
}