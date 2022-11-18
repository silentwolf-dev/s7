/** @format */

import {
	ChatInputCommandInteraction,
	Interaction,
	SlashCommandBuilder,
	inlineCode,
	ModalBuilder,
	Guild,
	GuildBasedChannel,
} from "discord.js";

import client from "../client";
import guildGiveaway from "../models/giveaway";
import { ReactionManager } from "discord.js";
import giveawayUitls from "../utils/giveaway";
import { IGiveawayMetadata } from "../schema/giveawaySchema";

export = {
	data: new SlashCommandBuilder()
		.setName("giveaway")
		.setDescription("creates a giveaway")
		.addSubcommand((subcommand) => {
			return subcommand
				.setName("start")
				.setDescription("creates a givaway")
				.addIntegerOption((option) => {
					return option
						.setName("duration")
						.setDescription("sets the duration in minates")
						.setRequired(true);
				})

				.addIntegerOption((option) => {
					return option
						.setName("winnercount")
						.setDescription("The amount of people that can win");
				});
		})
		.addSubcommand((subcommand) => {
			return subcommand
				.setName("setup")
				.setDescription("setup the giveaway")
				.addChannelOption((option) => {
					return option
						.setName("channel")
						.setDescription("sets the channel")
						.setRequired(true);
				});
		}),

	async execute(interaction: ChatInputCommandInteraction, client: client) {
		const option = interaction.options;
		const { GiveawayUitls } = client.utils;
		const subcommand = interaction.options.getSubcommand();
		const channelid = null;
		// todo: make a start command the giveway

		if (subcommand === "setup") {
			GiveawayUitls.setGiveawaychannel(
				interaction.guildId as string,
				option.getChannel("channel", true).id
			).then(async (res) => {

				console.log(res)
				await interaction.reply({
					content: ` Giveaway channel set `,
				});
			});
		}
	},
};
