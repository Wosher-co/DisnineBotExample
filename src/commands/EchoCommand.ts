import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  TextChannel,
} from "discord.js";
import { BaseCommand, DisBot } from "disnine.js";
import {
  ArgumentType,
  SlashArgument,
} from "disnine.js/dist/handlers/CommandHandler";

export default class EchoCommand extends BaseCommand {
  constructor() {
    super(
      "echo",
      "An echo command",
      undefined,
      [
        new SlashArgument(ArgumentType.STRING, "message", "Message to echo"),
        new SlashArgument(
          ArgumentType.CHANNEL,
          "channel",
          "Channel to send the echo",
          true
        ),
      ],
      undefined,
      "global"
    );
  }

  async execute(bot: DisBot, interaction: CommandInteraction): Promise<void> {
    const echoMessage = interaction.options.getString("message");
    const rawChannel = interaction.options.getChannel("channel");
    let channel: TextChannel | undefined = undefined;

    if (rawChannel !== null) {
      const channelId = rawChannel.id;
      const foundChannel = bot.channels.cache.find((ch) => ch.id === channelId);
      if (foundChannel !== undefined && foundChannel instanceof TextChannel) {
        channel = foundChannel;
      } else {
        interaction.reply({content: "Invalid channel!"});
        return;
      }
    }

    if (channel === undefined) {
      channel = bot.channels.cache.find(
        (ch) => ch.id === interaction.channel?.id
      ) as TextChannel;
    }

    const customId = bot.buttonHandler.createHandler(async (bot, i) => {
      await channel?.send({ content: echoMessage });
      await i.update({ content: "Echo sent!", components: [] });
    });

    interaction.reply({
      content: `Click the button to send \`${echoMessage}\` to <#${channel?.id}>`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("Send Message")
            .setStyle("SUCCESS")
            .setCustomId(customId)
            .setEmoji("🛫")
        ),
      ],
    });
  }
}
