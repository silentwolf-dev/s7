/** @format */

import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	Interaction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import client from "../client";

import GuildSettings from "../models/Settings";

export = {
	data: new SlashCommandBuilder()
		.setName("gsetup")
		.setDescription("set the givaway channel")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("sets the givaway channel")
				.setRequired(true)
		),

	async execute(interaction: ChatInputCommandInteraction, client: client) {
		if (
			!interaction.memberPermissions?.has(
				PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageChannels
			)
		) {
			interaction.reply({
				content: `You don't have permission to use this command`,
				ephemeral: true,
			});
			return;
		}

		if (!interaction.guild) {
			interaction.reply({
				content: "You must be a server to use this command",
			});
			return;
		}
		// todo: set the givaway channel
		try {
			await interaction.deferReply({ ephemeral: true });

			await client.utils.GiveawayUitls.setGiveawaychannel(
				interaction.guild.id,
				interaction.options.getChannel("channel", true).id,
			);

			const successEmbed = new EmbedBuilder({
				title: "gsetup",
				description: `successfully set channel to <#${await client.utils.GiveawayUitls.getChannelId(
					interaction.guild.id
				)}>`,
			}).setColor("Green");

			await interaction.editReply({ embeds: [successEmbed] });
		} catch (error) {
			interaction.reply("error occured")
			console.log(error);
		}
	},
};
