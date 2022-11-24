"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("purge")
        .setDescription("delete message in current channel")
        .addIntegerOption((option) => {
        return option.setName("amount").setDescription("how many should i purge");
    }),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isTextBased)) {
            interaction.reply("channel is not text channel");
            return;
        }
        const amount = interaction.options.getInteger("amount") || 100;
        const successEmbed = new discord_js_1.EmbedBuilder({
            title: "**Purge**",
            description: `<@${interaction.user.id}> deleted ${amount} messages`,
            timestamp: new Date().toISOString(),
        }).setColor("#2b53d6");
        const channel = interaction.channel;
        try {
            yield channel.bulkDelete(amount, true);
            const msg = yield interaction.reply({
                embeds: [successEmbed],
                fetchReply: true,
            });
            yield msg.react("❌");
            const filter = (reaction, user) => {
                return reaction.emoji.name === "❌" && user.id === interaction.user.id;
            };
            const collector = msg.createReactionCollector({ filter, time: Math.floor(10 * 60000) });
            collector.on('collect', (reaction, user) => {
                msg.delete();
            });
        }
        catch (error) {
            interaction.reply("error accord");
            console.log(error);
        }
    }),
};
