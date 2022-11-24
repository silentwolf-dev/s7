import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import client from "./client";

export interface ISlashCommand {
    data: SlashCommandBuilder,

    execute(interaction: ChatInputCommandInteraction, client?: client): any ,
}