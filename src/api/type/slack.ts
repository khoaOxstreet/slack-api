
export interface SlackEventType {
  channel: string;
  channel_type: string;
  client_msg_id: string;
  event_ts: string;
  team: string;
  text: string;
  ts: string;
  type: string;
  user: string;
}

export interface BotInfoType {
  url: string;
  team: string;
  user: string;
  team_id: string;
  user_id: string;
  bot_id: string;
}