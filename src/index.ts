import DiscordJs, { IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

import { ClientDiscord } from './structures/Client'

export const client = new ClientDiscord()
client.start()