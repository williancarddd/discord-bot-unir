"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDiscord = void 0;
const discord_js_1 = require("discord.js");
const discord_player_1 = require("discord-player");
const getFilePathPerNameFolder_1 = require("../utils/getFilePathPerNameFolder");
class ClientDiscord extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    player;
    constructor() {
        super({
            intents: [
                'DirectMessageReactions',
                'DirectMessages',
                'DirectMessageReactions',
                'GuildBans',
                'GuildInvites',
                'GuildMembers',
                'GuildMessages',
                'GuildMessageReactions',
                'Guilds',
                'GuildVoiceStates',
                'MessageContent',
            ],
        });
        this.player = new discord_player_1.Player(this, {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            },
        });
    }
    start() {
        this.registerModules();
        this.login(process.env.TOKEN_DISCORD);
    }
    async importFile(filePath) {
        return (await Promise.resolve().then(() => __importStar(require(filePath))))?.default;
    }
    async registerCommands({ commands, guidId }) {
        if (guidId) {
            this.guilds.cache.get(guidId)?.commands.set(commands);
            console.log(`Registering commands to ${guidId}`);
        }
        else {
            this.application?.commands.set(commands);
            console.log('Registering global commands');
        }
    }
    async registerModules() {
        // Commands
        const slashCommands = [];
        const commandFiles = await (0, getFilePathPerNameFolder_1.getFilePathPerNameFolder)('commands');
        commandFiles.forEach(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            console.log(command.name);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        this.on('ready', () => {
            this.registerCommands({
                commands: slashCommands,
                guidId: process.env.GUID_ID,
            });
        });
        // Event
        const eventFiles = await (0, getFilePathPerNameFolder_1.getFilePathPerNameFolder)('events');
        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }
}
exports.ClientDiscord = ClientDiscord;
