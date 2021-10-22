import { Intents } from "discord.js/typings/index.js";
import { DisBot } from "disnine.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const bot = new DisBot(
  { clientOptions: { intents: [Intents.FLAGS.GUILDS] } },
  { commandsPath: path.join(__dirname, "commands/") },
  { listenersPath: path.join(__dirname, "listeners/") }
);

bot.login(process.env.TOKEN === undefined ? "" : process.env.TOKEN);
