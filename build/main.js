"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = __importDefault(require("./config.json"));
const uri = `mongodb+srv://admin:${config_json_1.default.dbpassword}@cluster0.3vcff.mongodb.net/${config_json_1.default.dbname}`;
console.clear();
mongoose_1.default
    .connect(uri, {
    autoIndex: false,
})
    .then(() => console.error(`connected to database`))
    .catch((err) => console.log("Database Startup Error:", err));
const bot = new client_1.default();
bot.start();
