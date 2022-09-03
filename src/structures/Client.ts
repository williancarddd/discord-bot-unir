import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from 'discord.js'
import { Player } from 'discord-player'
import { CommandType } from '../interfaces/commands'
import { RegisterCommandsOptions } from '../interfaces/client'
import { Event } from './Event'
import { getFilePathPerNameFolder } from '../utils/getFilePathPerNameFolder'

export class ClientDiscord extends Client {
  commands: Collection<string, CommandType> = new Collection()
  player?: Player
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
    })
    this.player = new Player(this, {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
      },
    })
  }

  start() {
    this.registerModules()
    this.login(process.env.TOKEN_DISCORD)
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default
  }

  async registerCommands({ commands, guidId }: RegisterCommandsOptions) {
    if (guidId) {
      this.guilds.cache.get(guidId)?.commands.set(commands)
      console.log(`Registering commands to ${guidId}`)
    } else {
      this.application?.commands.set(commands)
      console.log('Registering global commands')
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await getFilePathPerNameFolder('commands')
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath)
      if (!command.name) return
      console.log(command.name)

      this.commands.set(command.name, command)
      slashCommands.push(command)
    })

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guidId: process.env.GUID_ID,
      })
    })

    // Event
    const eventFiles = await getFilePathPerNameFolder('events')
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath)
      this.on(event.event, event.run)
    })
  }
}
