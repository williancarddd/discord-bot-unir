import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";


const client = new ExtendedClient();

client.start();

client.on("ready", () => {
    console.log("Bot Online.".green)
})

export {client};