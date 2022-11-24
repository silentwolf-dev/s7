"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const giveawaySchema_1 = require("../schema/giveawaySchema");
const mongoose_1 = __importDefault(require("mongoose"));
const guildGiveaway = mongoose_1.default.model("giveaways", giveawaySchema_1.GiveawaySchema);
exports.default = guildGiveaway;
