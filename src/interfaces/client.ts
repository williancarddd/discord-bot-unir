import { ApplicationCommandDataResolvable } from "discord.js";

export interface RegisterCommandsOptions {
  guidId?: string;
  commands: ApplicationCommandDataResolvable[];
}