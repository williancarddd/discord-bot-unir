import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from 'discord.js'
import { ClientDiscord  } from '../structures/Client'

/*
{
  name: command name,
  description: command description,
  run: async ({interaction}) => {
  }
}
*/
export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface IRunOptions {
  client: ClientDiscord,
  interaction: CommandInteraction,
  args: CommandInteractionOptionResolver
}

type RunFunction = (options: IRunOptions) => any;

export type CommandType = {
  userPermission?: PermissionResolvable[],
  run: RunFunction, 
} & ChatInputApplicationCommandData