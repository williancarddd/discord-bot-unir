"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../../structures/Event");
exports.default = new Event_1.Event('ready', () => {
    console.log('Bot is ready.');
});
