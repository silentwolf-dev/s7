/** @format */

import {
	ChatInputCommandInteraction,
	Collector,
	Interaction,
	MessageReaction,
	EmbedBuilder,
	TextChannel,
	User,
	ReactionCollector,
} from "discord.js";
import giveaway from "../commands/gstart";
import randomUserIdFormat from "./groll";
import randomString from "./randomstring";

type MessageId = string;

export interface IStorageMap {
	_id: string;
	winnercount: number;
	duration: number;
	prize: string;
	expiration: number;
	guild_id: string;
	message_id: string;
	host_id: string;
	host_at: number;
}

interface IGiveawayManagerOptions {
	winnercount: number;
	duration: number;
	prize: string;
	storage: Map<MessageId, IStorageMap>;
	channel: TextChannel;
}

export async function GiveawayManager(
	interaction: Interaction,
	option: IGiveawayManagerOptions
) {
	try {
		const { storage, channel, winnercount, duration, prize } = option;
		const date = new Date();
		const expire = Math.floor(date.setMinutes(date.getMinutes() + duration));

		const emoji = "🎁";
		const id = randomString(8);

		const GivewayEmbed = new EmbedBuilder({
			title: `🎉 **Giveaway(${id})** 🎉`,
			description: `New giveaway created by <@${interaction.user.id}>`,
			fields: [
				{
					name: "**ends**",
					value: date.toLocaleTimeString(),
					inline: true,
				},

				{
					name: "**winner count**",
					value: winnercount.toString(),
					inline: true,
				},

				{
					name: "prize",
					value: option.prize,
					inline: true,
				},
			],
			footer: {
				text: `host by: ${interaction.user.tag}`,
			},
		}).setColor("Red");

		const msg = await channel.send({ embeds: [GivewayEmbed] });

		await msg.react(emoji);

		if (!storage.has(msg.id)) {
			storage.set(msg.id, {
				_id: id,
				winnercount,
				prize,
				guild_id: interaction.guildId as string,
				message_id: msg.id,
				expiration: expire,
				host_id: interaction.user.id,
				host_at: date.getTime(),
				duration: duration,
			});
		}

		Givawayhost(interaction as any, {
			storage: storage,
			channel: channel,
			watchEmoji: emoji,
		});
	} catch (error) {
		console.log(error);
	}
}

interface IGiveawayhostOptions {
	storage: Map<string, IStorageMap>;
	watchEmoji: string;
	channel: TextChannel;
}

interface IMessageReactions {
	msg_id: string;
	reactionsUser: string[];
}

async function Givawayhost(
	interaction: ChatInputCommandInteraction,
	options: IGiveawayhostOptions
) {
	try {
		const { storage, channel } = options;
		const messagesReaction = new Map<string, string[]>();
		storage.forEach(async (value) => {
			const msg = await channel.messages.cache.find(
				(msg) => msg.id === value.message_id
			);

			if (!msg) return;
			const user_ids: string[] = [];

			const collecter = msg.createReactionCollector({
				filter: (reaction, user) => {
					return reaction.emoji.name === options.watchEmoji;
				},
			});

			collecter.on("collect", (reaction, user) => {
				if (user.id === interaction.client.user.id) {
					return;
				}
				console.log(`collected ${user.id} reaction`);
				user_ids.push(user.id);
				console.log(user.id, user.tag, user_ids)
			});
			
            const randomUser = randomUserIdFormat({
				amount: value.winnercount,
				array: user_ids,
			});

			const interval = setInterval(() => {
				if (Date.now() < value.expiration) {
					return;
				}
               
		
			
				const GiveawayEndEmbed = new EmbedBuilder({
					title: `Giveaway(${value._id}) Ended`,
					description: `winners: ${randomUser}`,
					timestamp: new Date().toISOString(),
				}).setColor("#bd541c");

				msg.edit({ embeds: [GiveawayEndEmbed] });

				clearInterval(interval);
			}, 2 * 1000);
		});
	} catch (error) {
		console.log(error);
	}
}
