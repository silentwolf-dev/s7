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
const Settings_1 = __importDefault(require("../models/Settings"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("set-giveaway-channel")
        .setDescription("set the givaway channel")
        .addChannelOption((option) => option
        .setName("channel")
        .setDescription("sets the givaway channel")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.guildId) {
                interaction.reply("Guild not detected");
                return;
            }
            Settings_1.default.findOne({ _id: interaction.guildId }, function (err, guildSettings) {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        interaction.reply("> Error while starting saving process");
                        return;
                    }
                    if (!guildSettings) {
                        guildSettings = new Settings_1.default({
                            _id: interaction.guildId,
                            channels: {
                                giveaway_channel: (_a = interaction.options.getChannel("channel")) === null || _a === void 0 ? void 0 : _a.id,
                            },
                        });
                    }
                    else {
                        guildSettings.channels.giveaway_channel =
                            (_b = interaction.options.getChannel("channel")) === null || _b === void 0 ? void 0 : _b.id;
                    }
                    guildSettings.save((err) => {
                        if (err) {
                            interaction.reply(`> error while saving`);
                            return;
                        }
                        interaction.reply(`> Giveaway channel set to ${interaction.options.getChannel("channel")}`);
                    });
                });
            });
        });
    },
};
