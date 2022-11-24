"use strict";
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
/** @format */
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const giveaway_1 = __importDefault(require("./utils/giveaway"));
const randomstring_1 = __importDefault(require("./utils/randomstring"));
const guildId = "922567360873922661";
const config_json_1 = __importDefault(require("./config.json"));
class client extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessageReactions,
                discord_js_1.GatewayIntentBits.GuildMessages,
            ],
        });
        this.commands = new discord_js_1.Collection();
        this.giveaways = new Map();
        this.utils = {
            GiveawayUitls: giveaway_1.default,
            randomString: randomstring_1.default,
        };
    }
    loadCommands() {
        const command = [];
        const commandsPath = path_1.default.join(__dirname, "commands");
        const commandFiles = fs_1.default
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of commandFiles) {
            const filePath = path_1.default.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ("data" in command && "execute" in command) {
                this.commands.set(command.data.name, command);
                console.log("successfully initialize commands");
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
        for (const file of commandFiles) {
            const cmds = require(`./commands/${file}`);
            command.push(cmds.data.toJSON());
        }
        const rest = new discord_js_1.REST({ version: "10" }).setToken(config_json_1.default.token);
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Started refreshing ${command.length} application (/) commands.`);
                // The put method is used to fully refresh all commands in the guild with the current set
                const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.default.clientId, guildId), { body: command });
                console.log(`successfully reloaded ${data.length} application (/)  commands`);
            }
            catch (error) {
                console.error("command loading error", error);
            }
        }))();
    }
    loadEvent() {
        const eventsPath = path_1.default.join(__dirname, "events");
        console.log("event folder:", eventsPath);
        const eventFiles = fs_1.default.readdirSync(eventsPath).filter((file) => {
            return file.endsWith(".ts") || file.endsWith(".js");
        });
        console.log("successfully loaded event files:", eventFiles);
        for (const file of eventFiles) {
            const filePath = path_1.default.join(eventsPath, file);
            const event = require(filePath);
            console.log("event Object:", event);
            if (event.once) {
                this.once(event.name, event.run.bind(null, this));
                console.log("successfully initialize events (once)");
            }
            else {
                this.on(event.name, event.run.bind(null, this));
                console.log("successfully initialize events (on)");
            }
        }
    }
    start() {
        this.loadCommands();
        this.loadEvent();
        /*
        this.once("ready", (bot) => {
            console.log(`bot is online: ${bot.user.tag}`);
        });
       */
        this.login(config_json_1.default.token);
    }
    ;
}
;
exports.default = client;
