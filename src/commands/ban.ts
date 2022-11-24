/** @format */

import { SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "../type";

export = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("ban a user")
		.addUserOption((option) => {
			return option.setName("user").setDescription("the user you want to ban");
		})
		.addStringOption((option) => {
			return option.setName("reason").setDescription("the reason for your ban");
		}),

	async execute(interaction, client?) {

        try {
            
            if (!interaction.memberPermissions?.has("BanMembers")) {

                await interaction.reply({
                    content: `You don't have permission to use this command`,
                    ephemeral: true,
                });
                return;
            }

        } catch (error) {
            
        }
		
        
	},
} as ISlashCommand;
