"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
exports.name = discord_js_1.Events.GuildCreate;
const run = (client, guild) => {
    console.log(guild.name);
};
exports.run = run;
