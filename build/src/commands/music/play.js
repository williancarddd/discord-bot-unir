"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
exports.default = new Command_1.Command({
    name: 'play',
    description: 'plays a song from youtube',
    options: [
        {
            name: 'song',
            options: [
                {
                    name: 'url',
                    description: 'the url of the song',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            description: 'loads a single song from youtube',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'playlist',
            description: 'loads a playlist from youtube',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'url',
                    description: 'the url of the playlist',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
        {
            name: 'search',
            description: 'searches for a song on youtube',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'searchterms',
                    description: 'name to search music',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        },
    ],
    run: async ({ client, interaction }) => {
        if (!interaction.isChatInputCommand())
            return;
        const subcommand = interaction.options.getSubcommand();
        // @ts-ignore
        if (!interaction.member?.voice.channel)
            return await interaction.followUp({
                content: 'You need to be in a voice channel to use this command!',
            });
        const queue = client.player?.createQueue(interaction.guildId);
        if (!queue?.connection)
            // @ts-ignore
            await queue?.connect(interaction.member.voice.channel);
        const embed = new discord_js_1.EmbedBuilder();
        if (subcommand === 'song') {
            const url = interaction.options.getString('url');
            const result = await client.player?.search(url, {
                requestedBy: interaction.user,
                searchEngine: discord_player_1.QueryType.YOUTUBE_VIDEO,
            });
            if (result?.tracks.length === 0)
                return await interaction.editReply({ content: 'No results found!' });
            const track = result?.tracks[0];
            await queue?.addTrack(track);
            embed.setDescription(`[${track?.title}](${track?.url})`);
            embed.setThumbnail(track?.thumbnail);
            embed.setFooter({
                text: `Duration ${track?.duration}`,
            });
            embed.setColor('Random');
        }
        else if (subcommand === 'playlist') {
            const url = interaction.options.getString('url');
            const result = await client.player?.search(url, {
                requestedBy: interaction.user,
                searchEngine: discord_player_1.QueryType.YOUTUBE_PLAYLIST,
            });
            if (result?.tracks.length === 0)
                return await interaction.editReply({ content: 'No results found!' });
            const playlist = result?.tracks;
            await queue?.addTracks(playlist);
            embed.setDescription(`**${playlist?.length} songs from [${result?.playlist?.title}]**(${result?.playlist?.url})`);
            embed.setThumbnail(result?.playlist?.thumbnail.toString());
            embed.setFooter({
                text: `Author ${result?.playlist?.author.name}`,
            });
            embed.setColor('Random');
        }
        else if (subcommand === 'search') {
            const url = interaction.options.getString('searchterms');
            const result = await client.player?.search(url, {
                requestedBy: interaction.user,
                searchEngine: discord_player_1.QueryType.AUTO,
            });
            if (result?.tracks.length === 0)
                return await interaction.editReply({ content: 'No results found!' });
            const track = result?.tracks[0];
            await queue?.addTrack(track);
            embed.setDescription(`[${track?.title}](${track?.url})`);
            embed.setThumbnail(track?.thumbnail);
            embed.setFooter({
                text: `Duration ${track?.duration}`,
            });
            embed.setColor('Random');
        }
        if (!queue?.playing)
            await queue?.play();
        return await interaction.editReply({
            embeds: [embed],
        });
    },
});
