import { QueryType } from "discord-player";
import { ApplicationCommandOptionType, EmbedBuilder  } from "discord.js";
import { Command } from "../../structures/Command"

export default new Command({
  name: "queue",
  description: "shows the current queue",
  options: [
    {
      name: "page",
      description: "the page of the queue",
      type: ApplicationCommandOptionType.Number,
      min_value: 1
    }
  ],
  run: async ({client, interaction}) => {
    if(!interaction.isChatInputCommand()) return;
    const queue = client.player?.getQueue(interaction.guildId!);
    if(!queue || !queue.playing) {
      return await interaction.editReply({content: "No music is being played!"});
    } 
    const totalPage = Math.ceil(queue.tracks.length / 10) || 1;
    const page = (interaction.options.getNumber("page")  || 1)  -  1;
    if(page > totalPage) 
      return await interaction.editReply({content: `The page must be between 1 and ${totalPage}`});
    
    const queueString = queue.tracks.slice(page * 10, page *10 + 10).map((song, index) => {
      return `**${page * 10 + index + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>\n`;
    }).join("\n");
    console.log(queueString);
    const currentSong  = queue.current;

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Queue")
          .setDescription(`**Currently Playing**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
                    )
        .setFooter({
            text: `Page ${page + 1} of ${totalPage}`
        })
        .setThumbnail(currentSong?.thumbnail!)
      ]
                    
  });
  }
})