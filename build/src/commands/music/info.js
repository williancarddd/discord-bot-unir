"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'info',
    description: 'Get information about the current song',
    run: async ({ client, interaction }) => {
        const queue = client.player?.getQueue(interaction.guildId);
        if (!queue)
            return await interaction.editReply({
                content: 'No song is currently playing!',
            });
        let bar = queue.createProgressBar({
            queue: false,
            length: 19,
        });
        const song = queue.current;
        await interaction.editReply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setThumbnail(song.thumbnail)
                    .setDescription(`Currently playing: [${song.title}](${song.url})\n\n` + bar),
            ],
        });
    },
});
