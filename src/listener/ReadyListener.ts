import { BaseListener, DisBot } from "disnine.js"

export default class ReadyListener extends BaseListener {
  constructor() {
    super("ready", "Ready Listener");
  }

  async execute(bot: DisBot, ...args: any[]): Promise<boolean> {
    console.log(`Bot ready!`);
    return false;
  }
}