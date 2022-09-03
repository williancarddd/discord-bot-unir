"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'resume',
    description: 'Resumes the current song',
    run: async ({ client, interaction }) => {
        const queue = client.player?.getQueue(interaction.guildId);
        if (!queue)
            return await interaction.editReply({
                content: 'No song is currently playing!',
            });
        await queue.setPaused(false);
        return await interaction.editReply({ content: 'Resumed the song!' });
    },
});
