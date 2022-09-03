import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'pause',
  description: 'Pauses the current song',
  run: async ({ client, interaction }) => {
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue)
      return await interaction.editReply({
        content: 'No song is currently playing!',
      })

    await queue.setPaused(true)
    return await interaction.editReply({
      content: 'Paused the song! `use /resume to resume the song`',
    })
  },
})
