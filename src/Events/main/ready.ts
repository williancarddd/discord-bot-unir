import { client } from "../..";
import { Event } from "../../structs/@types/Events";

export default new Event({
    name: "ready",
    once: true,
    run() {
        const {commands, buttons, Select, Modal} = client;

        console.log(`👌 Bot Online.`.green)
        console.log(`👌 Commands loaded: ${commands.size}`.green)
        console.log(`👌 Buttons loaded: ${buttons.size}`.green)
        console.log(`👌 Selects loaded: ${Select.size}`.green)
        console.log(`👌 Modals loaded: ${Modal.size}`.green)

    }
})