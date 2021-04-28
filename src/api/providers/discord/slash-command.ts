
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

export default class SlashCommand {
  client: any;
  guildId: string;
  constructor(client: any, guildId: string) {
    this.client = client;
    this.guildId = guildId;
  }

  public getApp = () => {
    const userId = this.client && this.client.user ? this.client.user.id : '';
    const app = this.client.api.applications(userId);
    if (this.guildId) {
      app.guilds(this.guildId);
    }
    return app;
  }

  public getCommands = async () => {
    const commands = await this.getApp().commands.get();
    return commands;
  }

  public addCommand = async (data: CommandType) => {
    await this.getApp().commands.post({
      data
    })
  }

  public removeCommand = async (commandId: string) => {
    await this.getApp().commands(commandId).delete();
  }

  public removeAllCommands = async () => {
    const commands = await this.getCommands();
    await Promise.all(commands.map((e: any) => this.removeCommand(e.id)))
  }

  public buildCommands = async (commands: CommandType[]) => {
    const existingCommands = await this.getCommands();
    console.log('existing commands', existingCommands);
    const commandNeedToBeAdded = commands.filter(e => !existingCommands.find((i: any) => i.name === e.name));
    console.log('commands need to be added', commandNeedToBeAdded);
    await Promise.all(commandNeedToBeAdded.map(e => this.addCommand(e)));
    console.log('buildCommands DONE');
  }

  public rebuildCommands = async (commands: CommandType[]) => {
    await this.removeAllCommands();
    await Promise.all(commands.map(e => this.addCommand(e)));
    console.log('rebuildCommands DONE');
  }

  public reply = async (interaction: any, content: string) => {
    this.client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content
        }
      }
    })
  }
}

export interface OptionResponse {
  name: string;
  value: any;
}

export const convertToObject = (options: OptionResponse[]) => {
  const result: any = {};
  options.forEach((option) => {
    result[option.name] = option.value;
  });
  return result;
}


export const commandsInitalization: CommandType[] = [
  {
    name: 'testing',
    description: 'Testing'
  },
  {
    name: 'prices',
    description: 'Get Prices by Sku and Currency (Default SGD)',
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
  },
  {
    name: 'offers',
    description: 'Get Offers by Sku and Currency (Default SGD)',
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
  },
  {
    name: 'price',
    description: 'Get Price by Sku and Size and Currency (Default SGD)',
    options: [
      {
        name: 'sku',
        description: 'Sku number',
        required: true,
        type: 3
      },
      {
        name: 'size',
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
  },
  {
    name: 'offer',
    description: 'Get Offer by Sku and Size and Currency (Default SGD)',
    options: [
      {
        name: 'sku',
        description: 'Sku number',
        required: true,
        type: 3
      },
      {
        name: 'size',
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
