/** @format */

import {
	Interaction,
	SlashCommandBuilder,
	TextChannel,
	EmbedBuilder,
	User,
	MessageReaction,
} from "discord.js";
import { ISlashCommand } from "../type";

export = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("delete message in current channel")
		.addIntegerOption((option) => {
			return option.setName("amount").setDescription("how many should i purge");
		}),

	execute: async (interaction) => {
		if (interaction.memberPermissions?.has("ManageMessages")) {
			interaction.reply("> ❌ You don't have permission");
			return;
		}

		if (!interaction.channel?.isTextBased) {
			interaction.reply("channel is not text channel");
			return;
		}
		const amount = interaction.options.getInteger("amount") || 100;

		const successEmbed = new EmbedBuilder({
			title: "**Purge**",
			description: `<@${interaction.user.id}> deleted ${amount} messages`,
			timestamp: new Date().toISOString(),
		}).setColor("#2b53d6");

		const channel = interaction.channel as TextChannel;

		try {
			await channel.bulkDelete(amount, true);
			const msg = await interaction.reply({
				embeds: [successEmbed],
				fetchReply: true,
			});
			await msg.react("❌");

			const filter = (reaction: MessageReaction, user: User) => {
				return reaction.emoji.name === "❌" && user.id === interaction.user.id;
			};
			const collector = msg.createReactionCollector({
				filter,
				time: Math.floor(10 * 60000),
			});

			collector.on("collect", (reaction, user) => {
				msg.delete();
			});
		} catch (error) {
			interaction.reply("error accord");
			console.log(error);
		}
	},
} as ISlashCommand;
