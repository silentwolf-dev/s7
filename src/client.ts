/** @format */
import {
	Client,
	GatewayIntentBits,
	Collection,
	REST,
	Routes,
} from "discord.js";
import fs from "fs";
import path from "path";
import GiveawayUitls from "./utils/giveaway";
import randomString from "./utils/randomstring";
const guildId = "922567360873922661";
import * as dotenv from "dotenv"
dotenv.config()
import { IStorageMap } from "./utils/giveawaymanger";



class client extends Client {
	commands = new Collection<string, any>();
	giveaways = new Map<string, IStorageMap>()
	utils = {
		GiveawayUitls,
		randomString,
	};

	constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessages,
			],
		});
	}

	loadCommands() {
		const command: any[] = [];
		const commandsPath = path.join(__dirname, "commands");
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ("data" in command && "execute" in command) {
				this.commands.set(command.data.name, command);

			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}

		for (const file of commandFiles) {
			const cmds = require(`./commands/${file}`);
			command.push(cmds.data.toJSON());
		}

		const rest = new REST({ version: "10" }).setToken(process.env.Token as string);

		(async () => {
			try {
				console.log(
					`Started refreshing ${command.length} application (/) commands.`
				);

				// The put method is used to fully refresh all commands in the guild with the current set
				const data: any = await rest.put(
					Routes.applicationGuildCommands(process.env.clientid as string, guildId),
					{ body: command }
				);

				console.log(`Done refreshing ${command.length} application (/) commands.`)
				
			} catch (error) {

				console.log("command loading error", error);
			}
		})();
	}

	loadEvent() {
		const eventsPath = path.join(__dirname, "events");
		const eventFiles = fs.readdirSync(eventsPath).filter((file) => {
			return file.endsWith(".ts") || file.endsWith(".js")
		});

		console.log("successfully loaded event files:", eventFiles)

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file)
			const event: any = require(filePath)

			console.log("event Object:", event)
			if (event.once) {
				this.once(event.name, event.run.bind(null, this))
			} else {
				this.on(event.name, event.run.bind(null, this))	
			}
		}
	}

	start() {
		this.loadCommands()

		this.loadEvent()
		/*
		this.once("ready", (bot) => {
			console.log(`bot is online: ${bot.user.tag}`);
		});
       */
  
		this.login(process.env.Token);

	    this.user?.setAvatar('./images/logo.jpeg')
	};
};

export default client;
