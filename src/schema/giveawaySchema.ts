/** @format */

import mongoose, { SchemaTypes, Document } from "mongoose";
import randomString from "../utils/randomstring";

export interface IGiveawayMetadata {
	title?: string;
	description?: string;
}

export interface IGiveawayDocument extends Document {
	_id: string;

    guild_id: string,

	winner_count: Number;
    
	expiration: Number;

	message_id: string;

	meta?: IGiveawayMetadata;
}

export const GiveawaySchema = new mongoose.Schema<IGiveawayDocument>(
	{
		_id: {
			type: SchemaTypes.String,
			required: true,
		},

		message_id: {
			type: SchemaTypes.String,
			required: true,
		},
		 

        winner_count: {
			type: SchemaTypes.Number,
			default: 1,
		},

	},
	{ timestamps: true }
);
