import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'info',
  description: 'Get information about the current song',
  run: async ({ client, interaction }) => {
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue)
      return await interaction.editReply({
        content: 'No song is currently playing!',
      })
    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    })
    const song = queue.current
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Currently playing: [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    })
  },
})
