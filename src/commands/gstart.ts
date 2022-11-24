/** @format */

import {
	ChatInputCommandInteraction,
	Interaction,
	SlashCommandBuilder,
	inlineCode,
	ModalBuilder,
	codeBlock,
	Guild,
	GuildBasedChannel,
	Message,
	MessageReaction,
	User,
	TextBasedChannel,
	TextChannel,
	Embed,
	EmbedBuilder,
} from "discord.js";

import client from "../client";
import guildGiveaway from "../models/giveaway";
import { ReactionManager } from "discord.js";
import giveawayUitls from "../utils/giveaway";
import { IGiveawayMetadata } from "../schema/giveawaySchema";
import randomUserIdFormat from "../utils/groll";
import randomString from "../utils/randomstring";
import { GiveawayManager } from "../utils/giveawaymanger";

interface IGiveawaydata {
	id: string;
	duration: number;
	guild_id: string;
	expiration: number;
	winnercount: number;
	message_id: string | undefined;
}
export = {
	data: new SlashCommandBuilder()
		.setName("gstart")
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
						.setDescription("The amount of people that can win")
						.setRequired(true);
				})
				.addStringOption((option) => {
					return option
						.setName("prize")
						.setDescription("the prize of the giveaway")
						.setRequired(true);
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

		if (!interaction.guild) {
			interaction.reply("command can only be used in a server");
			return;
		}

		try {
			const channelid = await client.utils.GiveawayUitls.getChannelId(interaction.guild.id);
            
			const channel: GuildBasedChannel | undefined = interaction.guild.channels.cache.find((ch)=> {
             return ch.id === channelid;
			});

			if (!channel) {
				interaction.reply("Could not find givaway channel");
				return;
			}

			if (!channel.isTextBased()) {
				console.log(channel.name, channel.type);
				interaction.reply("channel is not a text channel");
				return;
			}

			const successEmbed = new EmbedBuilder({
				title: "gstart",
				description: "Successfully created giveaway",
				timestamp: new Date().toISOString(),
			}).setColor("DarkGold");

			await interaction.deferReply({ ephemeral: true });

			await GiveawayManager(interaction, {
				duration: option.getInteger("duration") || 1,
				winnercount: option.getInteger("winnercount") || 1,
				prize: option.getString("prize") || "none",
				storage: client.giveaways,
				channel: channel as TextChannel,
			});

			await interaction.editReply({
				embeds: [successEmbed],
			});
		} catch (error) {}
	},
};
