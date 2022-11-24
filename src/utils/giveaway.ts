/** @format */
import { Guild, GuildWidgetStyle } from "discord.js";
import mongoose from "mongoose";
import interaction from "../events/interaction";
import guildGiveaway from "../models/giveaway";
import GuildSettings from "../models/Settings";
import { ISettingsDocument } from "../schema/settingsSchama";

class GiveawayUitls extends guildGiveaway {
	constructor() {
		super();
	}

	static async getChannelId(guildid: string) {
		try {
			const res = await GuildSettings.findById({ _id: guildid });
			console.log(res?.channels?.giveaway_channel);
			return res?.channels?.giveaway_channel;
		} catch (error) {

			console.log(error)
		}
	}

	static setGiveawaychannel(guildid: string, channel_id: any) {
		const promise = new Promise<ISettingsDocument>((resolve, reject) => {
			GuildSettings.findOne(
				{ _id: guildid },
				async (err: mongoose.CallbackError, setting: any) => {
					if (err) {
						reject("Error while finding [Guild settings]");
						return;
					}

					if (!setting) {
						setting = new GuildSettings({
							_id: guildid,
							channels: { giveaway_channel: channel_id },
						});
					} else {
						setting.channels.giveaway_channel = channel_id;
					}

					await setting.save((err: any, res: any) => {
						if (err) {
							reject(err);
						}

						resolve(res);
					});
				}
			);
		});

		return promise;
	}
}

export default GiveawayUitls;
