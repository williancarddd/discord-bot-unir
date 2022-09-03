"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'quit',
    description: 'stops the music and clears the queue',
    run: async ({ client, interaction }) => {
        const queue = client.player?.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: 'No music is being played!',
            });
        }
        queue.destroy();
        await interaction.editReply({
            content: 'Stopped the music and cleared the queue!, Bye!',
        });
    },
});
