/** @format */

import {
	EmbedBuilder,
	GuildMember,
	inlineCode,
	SlashCommandBuilder,
	User,
} from "discord.js";
import { ISlashCommand } from "../type";

export = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("ban a user")
		.addUserOption((option) => {
			return option
				.setName("user")
				.setDescription("the user you want to ban")
				.setRequired(true);
		})
		.addStringOption((option) => {
			return option.setName("reason").setDescription("the reason for your ban");
		}),

	async execute(interaction, client?) {
		const option = interaction.options;
		const target = option.getUser("user", true);
		const reason = option.getString("reason") || "none";
		const Guild = interaction.guild;
        const id = target.id;

		interaction.deferReply();

		if (!interaction.inGuild) {
			return;
		}

		try {
			if (!interaction.memberPermissions?.has("BanMembers")) {
				await interaction.reply({
					content: `You don't have permission to use this command`,
					ephemeral: true,
				});
				return;
			}

            const DmEmbed = new EmbedBuilder({
				title: "ban",
				description: `You have been ban from ${interaction.guild?.name} by ${interaction.user.username}`,
				fields: [
					{
						name: 'reason',
						value: reason,
						inline: true,
					}
				],
				timestamp: new Date().toISOString(),
			})

            interaction.client.users.send(id, {embeds: [DmEmbed]})


			await Guild?.members.ban(target, { reason });

			const responseEmbed = new EmbedBuilder({
				title: "ban",
				description: `${target.username} has been **ban!** reason: ${reason}.`,
				fields: [
					{
						name: "Offender",
						value: inlineCode(`${target.id}`),
						inline: true,
					},

					{
						name: "Mod",
						value: interaction.user.tag,
						inline: true,
					}
				],

				timestamp: new Date().toISOString(),
			}).setColor("Red");
            
			const reply = await interaction.editReply({ embeds: [responseEmbed] });
		} catch (error) {
			interaction.reply("Error while executing this command");
			console.log(error);
		}
	},
} as ISlashCommand;
