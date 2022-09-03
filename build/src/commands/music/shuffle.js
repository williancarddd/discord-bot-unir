"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'shuffle',
    description: 'shuffles the queue',
    run: async ({ client, interaction }) => {
        const queue = client.player?.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: 'No music is being played!',
            });
        }
        queue.shuffle();
        await interaction.editReply({
            content: `The queue of ${queue.tracks.length} songs has been shuffled by \`@${interaction.user.username}\`!`,
        });
    },
});
