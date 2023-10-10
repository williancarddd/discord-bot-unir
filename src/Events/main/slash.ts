import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../..";
import { Event } from "../../structs/@types/Events";

export default new Event({
    name: "interactionCreate",
    run(interactions) {
        if(!interactions.isCommand()) return;

        const command = client.commands.get(interactions.commandName);
        if(!command) return;
        const options = interactions.options as CommandInteractionOptionResolver;
        command.run({
            client: client,
            interaction: interactions,
            options: options
        })
    },
})