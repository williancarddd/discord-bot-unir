import { ActionRow, ActionRowBuilder, ApplicationCommandType, ButtonBuilder } from "discord.js";
import { Event } from "../../structs/@types/Events";
import { client } from "../..";


export default new Event({
    name: "interactionCreate",
    run(interaction) {
        if(interaction.isModalSubmit()) client.Modal.get(interaction.customId)?.(interaction)
        if(interaction.isButton()) client.buttons.get(interaction.customId)?.(interaction)
        if(interaction.isStringSelectMenu()) client.Select.get(interaction.customId)?.(interaction)

    }
})