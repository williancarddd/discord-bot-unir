import { CommandType } from '../interfaces/commands'

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions)
  }
}
