import { ApplicationCommandDataResolvable, BitFieldResolvable, Client, ClientEvents, Collection, GatewayIntentsString, IntentsBitField, Partials } from "discord.js";
import dotenv  from "dotenv";
import { TCommandType, TComponentsButton, TComponentsModal, TComponentsSelect } from "./@types/Commands";
import fs from "fs";
import path from "path";
import { EventType } from "./@types/Events";

dotenv.config();

const fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

export class ExtendedClient extends Client {
    public commands: Collection<string, TCommandType> = new Collection();
    public buttons: TComponentsButton = new Collection();
    public Select: TComponentsSelect = new Collection();
    public Modal: TComponentsModal = new Collection();

    constructor() {
        super(
            {
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number> ,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        })
    }

    public start() {
        this.registerModules()
        this.registerEvents()
        this.login(process.env.bot_token)
    }


    private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        this.application?.commands.set(commands)
        .then(() => {
            console.log("👌 Slash Commands (/) defined.".green)
        }).catch((error) => {
            console.log(`😨 An error occured while trying to set slash commands (/): \n {error}`.red)
        })
    }

    private registerModules() {
        const slashCommands: Array<ApplicationCommandDataResolvable>  = new Array();
        const commandsPath = path.join(__dirname, "..", "commands");

        fs.readdirSync(commandsPath).forEach(local => {
            fs.readdirSync(commandsPath + `\\${local}\\`).filter(fileCondition).forEach(async fileName => {
                const command: TCommandType = (await import(`../Commands/${local}/${fileName}`))?.default;
                const {name, buttons, modals, selects} = command;
                if(name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);

                    if(buttons)  buttons.forEach((run, key) => this.buttons.set(key, run));
                    if(selects)  selects.forEach((run, key) => this.Select.set(key, run));
                    if(modals)  modals.forEach((run, key) => this.Modal.set(key, run));
                }
            })
        })

        this.on("ready", () => this.registerCommands(slashCommands)
        )
    }

    private registerEvents(){
        const eventsPath = path.join(__dirname, "..", "events");
        fs.readdirSync(eventsPath).forEach(local => {
            fs.readdirSync(`${eventsPath}\\${local}`).filter(fileCondition)
            .forEach(async fileName => {
                const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))?.default
            
                try {
                    if (name) (once) ? this.once(name, run) : this.on(name, run);
                } catch (error) {
                    console.log(`An error occurred on event: ${name} \n${error}`.red);
                }
            })
        })
    }
}