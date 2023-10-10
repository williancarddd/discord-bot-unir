import { ApplicationCommandData, AutocompleteInteraction, ButtonInteraction, Collection, CommandInteraction, CommandInteractionOptionResolver, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { ExtendedClient } from "../ExtendedClient";

interface ICommandProps  {
    client: ExtendedClient;
    interaction: CommandInteraction;
    options: CommandInteractionOptionResolver;
};

export type TComponentsButton = Collection<string, (interaction: ButtonInteraction) => any>;
export type TComponentsSelect = Collection<string, (interaction: StringSelectMenuInteraction) => any>;
export type TComponentsModal = Collection<string, (interaction: ModalSubmitInteraction) => any>;

interface ICommandComponents { 
    buttons?: TComponentsButton;
    selects?: TComponentsSelect;
    modals?: TComponentsModal;
};

export type TCommandType = ApplicationCommandData & ICommandComponents & {
    run(props: ICommandProps): any
    autoComplete?: (interaction: AutocompleteInteraction) => any
};


export class Command {
    constructor(options: TCommandType) {
        options.dmPermission = false;
        Object.assign(this, options);
    }
}