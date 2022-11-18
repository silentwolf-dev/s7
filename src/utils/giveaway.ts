/** @format */

import { GuildWidgetStyle } from "discord.js";
import mongoose from "mongoose";
import guildGiveaway from "../models/giveaway";
import GuildSettings from "../models/Settings";

class GiveawayUitls extends guildGiveaway {
	constructor() {
		super()
	}

	static async getChannelId(guildid: string) {
		const res = await GuildSettings.findById({ _id: guildid });
      console.log(res?.channels?.giveaway_channel)
		return res?.channels?.giveaway_channel;
	}

	static async setGiveawaychannel(guildid: string, channel_id: string) {
	   GuildSettings.findOne({ _id: guildid }, function (err: any, setting: any) {
			if (err) {
				console.log(err);
			}

			if (!setting) {
				setting = new GuildSettings({
					_id: guildid,
					channels: {
						giveaway_channel: channel_id,
					},
				});
			} else {
				setting.channels.giveaway_channel = channel_id;
			}

	
		});
	}

}

export default GiveawayUitls;
