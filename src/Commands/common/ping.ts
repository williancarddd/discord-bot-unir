import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection } from "discord.js";
import { Command } from "../../structs/@types/Commands";

export default new Command(
    {
        name:"ping",
        description:"reply with pong, check bot.",
        type: ApplicationCommandType.ChatInput,
        run({interaction}) {
            const row = new ActionRowBuilder<ButtonBuilder>({components: [
                new ButtonBuilder({customId: "test-button", label: "ping", style: ButtonStyle.Success})
            ]})
            interaction.reply({ephemeral: true, content: "pong", components: [row]})

        },
        buttons: new Collection([
            ["test-button", async  (interaction) => {
                interaction.update({content: "atualizado.", components: []})
            }]
       ])  
    }
);