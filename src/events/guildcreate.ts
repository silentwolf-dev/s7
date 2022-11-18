import { Events, Guild } from "discord.js";
import client from "../client";



export const name = Events.GuildCreate;


export const run = (client: client, guild: Guild) => {
    console.log(guild.name)
}