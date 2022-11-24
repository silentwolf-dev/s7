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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveawayManager = void 0;
const discord_js_1 = require("discord.js");
const groll_1 = __importDefault(require("./groll"));
const randomstring_1 = __importDefault(require("./randomstring"));
function GiveawayManager(interaction, option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { storage, channel, winnercount, duration, prize } = option;
            const date = new Date();
            const expire = Math.floor(date.setSeconds(date.getSeconds() + parseInt(duration)));
            const emoji = "🎁";
            const id = (0, randomstring_1.default)(8);
            const GivewayEmbed = new discord_js_1.EmbedBuilder({
                title: `Givaway(${id})`,
                description: `New giveaway created by <@${interaction.user.id}>`,
                fields: [
                    {
                        name: "ends",
                        value: date.toLocaleTimeString(),
                        inline: true,
                    },
                    {
                        name: "winner count",
                        value: winnercount.toString(),
                        inline: true,
                    },
                ],
                footer: {
                    text: `host by: ${interaction.user.tag}`,
                },
            }).setColor("Red");
            const msg = yield channel.send({ embeds: [GivewayEmbed] });
            yield msg.react(emoji);
            if (!storage.has(msg.id)) {
                storage.set(msg.id, {
                    _id: id,
                    winnercount,
                    prize,
                    guild_id: interaction.guildId,
                    message_id: msg.id,
                    expiration: expire,
                    host_id: interaction.user.id,
                    host_at: date.getTime(),
                    duration: duration.toString(),
                });
            }
            Givawayhost(interaction, {
                storage: storage,
                channel: channel,
                watchEmoji: emoji,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.GiveawayManager = GiveawayManager;
function Givawayhost(interaction, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { storage, channel } = options;
            const messagesReaction = new Map();
            storage.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                const msg = yield channel.messages.cache.find((msg) => msg.id === value.message_id);
                if (!msg)
                    return;
                if (storage.has(msg.id)) {
                    const user_ids = [];
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
                    });
                    const interval = setInterval(() => {
                        if (Date.now() < value.expiration) {
                            return;
                        }
                        const randomUser = (0, groll_1.default)({
                            amount: parseInt(value.winnercount),
                            array: user_ids,
                        });
                        const GiveawayEndEmbed = new discord_js_1.EmbedBuilder({
                            title: `Giveaway(${value._id}) Ended`,
                            description: `winners: ${randomUser}`,
                        }).setColor("#bd541c");
                        msg.edit({ embeds: [GiveawayEndEmbed] });
                        clearInterval(interval);
                    }, 2 * 1000);
                }
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
