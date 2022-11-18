/** @format */

import client from "./client";

import mongoose from "mongoose";
import config from "./config.json";
const uri = `mongodb+srv://admin:${config.dbpassword}@cluster0.3vcff.mongodb.net/${config.dbname}`;

console.clear()

mongoose
	.connect(uri, {
		autoIndex: false,
	})
	.then(() => console.error(`connected to database`))
	.catch((err) => console.log("Database Startup Error:", err));

const bot = new client();

bot.start();
