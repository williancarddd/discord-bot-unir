import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

export default new Command({
  name: 'quit',
  description: 'stops the music and clears the queue',
  run: async ({ client, interaction }) => {
    const queue = client.player?.getQueue(interaction.guildId!)
    if (!queue || !queue.playing) {
      return await interaction.editReply({
        content: 'No music is being played!',
      })
    }
    queue.destroy()
    await interaction.editReply({
      content: 'Stopped the music and cleared the queue!, Bye!',
    })
  },
})
