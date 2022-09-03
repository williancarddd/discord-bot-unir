import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'resume',
  description: 'Resumes the current song',
  run: async ({ client, interaction }) => {
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue)
      return await interaction.editReply({
        content: 'No song is currently playing!',
      })

    await queue.setPaused(false)
    return await interaction.editReply({ content: 'Resumed the song!' })
  },
})
