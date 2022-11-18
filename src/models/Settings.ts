import mongoose from "mongoose";
import { SettingSchama } from "../schema/settingsSchama";



const GuildSettings =  mongoose.model("Settings", SettingSchama);

export default GuildSettings;