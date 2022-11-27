/** @format */

import {
	SlashCommandBuilder,
	User,
	EmbedBuilder,
	inlineCode,
} from "discord.js";
import { ISlashCommand } from "../type";

export = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("kicks a user from the server")
		.addUserOption((option) => {
			return option
				.setName("user")
				.setDescription("The offender/target you want to kick")
				.setRequired(true);
		})
		.addStringOption((option) => {
			return option
				.setName("reason")
				.setDescription("the reason for this moderation action")
				.setRequired(true);
		}),

	async execute(interaction, client?) {
		interaction.deferReply()
        try {
            if (!interaction.memberPermissions?.has("KickMembers")) {
                return interaction.reply("You don't have permission to use this command");
            }
    
            if (!interaction.guild) {
                return interaction.reply("This command can only be use in a server");
            }
    
            const user: User = interaction.options.getUser("user", true);
            const member = interaction.guild.members.cache.get(user.id);
            const reason = interaction.options.getString("reason") || "none";
    
            if (!member) {
                return interaction.reply("User is not in Guild");
            }
    
            const DmEmbed = new EmbedBuilder({
                title: "Kick",
                description: `You have been kicked from ${inlineCode(
                    interaction.guild.name
                )}`,
            }).setColor("Orange");
    
            const successEmbed = new EmbedBuilder({
                title: "**Moderation - Kick**",
                description: `<${interaction.user.id}> kicked <@${member.id}>  reason: ${reason} `,
                timestamp: new Date().toISOString(),
            }).setColor("Gold");
    
            await member.kick(reason);
    
            await interaction.reply({ embeds: [successEmbed] });
    
            await interaction.user.send({ embeds: [DmEmbed] });
    
        } catch (error) {
            console.error(error)

            interaction.reply("error while executing this command")
        }
	},
} as ISlashCommand;
