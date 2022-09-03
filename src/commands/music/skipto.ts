import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'skipto',
  description: 'skip to a certain song in the queue',
  options: [
    {
      name: 'tracknumber',
      description: 'the track number to skip to',
      type: ApplicationCommandOptionType.Number,
      min_value: 1,
      required: true,
    },
  ],
  run: async ({ client, interaction }) => {
    if (!interaction.isChatInputCommand()) return
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue || !queue.playing) {
      return await interaction.editReply({
        content: 'No music is being played!',
      })
    }
    const trackNumber = interaction.options.getNumber('tracknumber')!
    if (trackNumber > queue.tracks.length) {
      return await interaction.editReply({
        content: `The track number must be between 1 and ${queue.tracks.length}`,
      })
    }
    queue.skipTo(trackNumber - 1)
    return await interaction.editReply({
      content: `Skipped to track number ${trackNumber}`,
    })
  },
})
