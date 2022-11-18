/** @format */

import { SlashCommandBuilder, Interaction} from "discord.js";

export = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Ping is a basic command that every devs use."),

	execute: async (interaction: Interaction) => {
		if(!interaction.isChatInputCommand()) return;
        
	},
};
