/** @format */

import {
	ChatInputCommandInteraction,
	Interaction,
	SlashCommandBuilder,
} from "discord.js";

import GuildSettings from "../models/Settings";

export = {
	data: new SlashCommandBuilder()
		.setName("set-giveaway-channel")
		.setDescription("set the givaway channel")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("sets the givaway channel")
				.setRequired(true)
		),

	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.guildId) {
			interaction.reply("Guild not detected");

			return;
		}

		GuildSettings.findOne(
			{ _id: interaction.guildId },
			async function (err: any, guildSettings: any) {
				if (err) {
					console.log(err);
					interaction.reply("> Error while starting saving process");
					return;
				}

				if (!guildSettings) {
					guildSettings = new GuildSettings({
						_id: interaction.guildId,
						channels: {
							giveaway_channel: interaction.options.getChannel("channel")
								?.id as string,
						},
					});
				} else {
					guildSettings.channels.giveaway_channel =
						interaction.options.getChannel("channel")?.id;
				}

				guildSettings.save((err: any) => {
					if (err) {
						interaction.reply(`> error while saving`);
						return;
					}

					interaction.reply(
						`> Giveaway channel set to ${interaction.options.getChannel(
							"channel"
						)}`
					);
				});
			}
		);
	},
};
