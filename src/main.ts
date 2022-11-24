/** @format */

import client from "./client";

import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const uri = `mongodb+srv://admin:${process.env.db_password}@cluster0.3vcff.mongodb.net/Senior7`;

console.clear();

mongoose
	.connect(uri, {
		autoIndex: false,
	})
	.then(() => console.error(`connected to database`))
	.catch((err) => console.log("Database Startup Error:", err));

const bot = new client();

bot.start();
