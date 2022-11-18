/** @format */

import { GiveawaySchema } from "../schema/giveawaySchema";
import mongoose from "mongoose";

const guildGiveaway = mongoose.model("giveaways", GiveawaySchema);

export default guildGiveaway;
