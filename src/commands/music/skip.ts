import { ApplicationCommandOptionType, EmbedBuilder  } from "discord.js";
import { Command } from "../../structures/Command"

export default new Command({
  name: "skip",
  description: "skip the current song",
  run: async ({client, interaction}) => {
    const queue = client.player?.getQueue(interaction.guildId!);
    if(!queue ) return await interaction.editReply({content: "No music is being played!"});
  
    const currentSong = queue.current;
    queue.skip();
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
        .setThumbnail(currentSong.thumbnail)
        .setDescription(`${currentSong.title} has been skipped!`)
        .setColor("Random")

      ]
    });
  }
});