"use strict";
/** @format */
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    run: function (client) {
        console.log(`bot is online: ${client.user.tag}`);
    },
};
