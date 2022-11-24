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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const giveaway_1 = __importDefault(require("../utils/giveaway"));
const giveawaymanger_1 = require("../utils/giveawaymanger");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("giveaway")
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
                .setDescription("The amount of people that can win");
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
    execute(interaction, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const option = interaction.options;
            const { GiveawayUitls } = client.utils;
            const subcommand = interaction.options.getSubcommand();
            // todo: make a start command the giveway
            let givaway_channelid = yield giveaway_1.default.getChannelId(interaction.guildId);
            let giveaway_channel = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find((channel) => channel.id === givaway_channelid);
            if (subcommand === "start") {
                if (!(giveaway_channel === null || giveaway_channel === void 0 ? void 0 : giveaway_channel.isTextBased()))
                    return;
                const date = new Date();
                const duration = option.getInteger("duration", true) || 1;
                const winnercount = option.getInteger("winnercount") || 1;
                try {
                    yield interaction.deferReply();
                    (0, giveawaymanger_1.GiveawayManager)(interaction, {
                        duration: duration.toString(),
                        prize: "role",
                        channel: giveaway_channel,
                        winnercount: winnercount.toString(),
                        storage: client.giveaways,
                    });
                    yield interaction.editReply(`Your giveaway was created at <#${givaway_channelid}>`);
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    },
};
