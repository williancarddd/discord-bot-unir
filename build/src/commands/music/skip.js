"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'skip',
    description: 'skip the current song',
    run: async ({ client, interaction }) => {
        const queue = client.player?.getQueue(interaction.guildId);
        if (!queue)
            return await interaction.editReply({
                content: 'No music is being played!',
            });
        const currentSong = queue.current;
        queue.skip();
        return await interaction.editReply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setThumbnail(currentSong.thumbnail)
                    .setDescription(`${currentSong.title} has been skipped!`)
                    .setColor('Random'),
            ],
        });
    },
});
