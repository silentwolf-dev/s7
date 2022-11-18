/** @format */

import { Events, Interaction, CacheType } from "discord.js";

export = {
	name: Events.ClientReady,
	once: true,
	run: function (client: any) {
		console.log(`bot is online: ${client.user.tag}`);
	},
};
