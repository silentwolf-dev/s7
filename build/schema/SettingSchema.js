"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.settingSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.SchemaTypes,
    prefix: {
        type: mongoose_1.default.SchemaTypes.String,
        required: false,
    },
    channels: {
        WelcomeChannelId: mongoose_1.default.SchemaTypes.String,
        ModLogChannelId: mongoose_1.default.SchemaTypes.String,
        SuggestionChannel: mongoose_1.default.SchemaTypes.String,
    },
});
