"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SettingSchema_1 = require("../schema/SettingSchema");
const SettingModal = mongoose_1.default.model("ServerSettings", SettingSchema_1.settingSchema);
exports.default = SettingModal;
