import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'shuffle',
  description: 'shuffles the queue',
  run: async ({ client, interaction }) => {
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue || !queue.playing) {
      return await interaction.editReply({
        content: 'No music is being played!',
      })
    }
    queue.shuffle()
    await interaction.editReply({
      content: `The queue of ${queue.tracks.length} songs has been shuffled by \`@${interaction.user.username}\`!`,
    })
  },
})
