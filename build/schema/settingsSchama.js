"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingSchama = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const channelSchama = new mongoose_1.default.Schema({
    giveaway_channel: mongoose_1.default.SchemaTypes.String,
    suggestion_channel: mongoose_1.default.SchemaTypes.String,
});
exports.SettingSchama = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
    },
    prefix: {
        type: mongoose_1.default.SchemaTypes.String,
        default: "!",
    },
    channels: channelSchama,
}, { timestamps: true });
