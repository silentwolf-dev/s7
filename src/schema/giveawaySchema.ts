/** @format */

import mongoose, { SchemaTypes } from "mongoose";

export interface IGiveawayMetadata {
	winner_count: Number;
	expiration: Number,
	title?: string;
	description?: string;
}

export interface IGiveawaySchama {
	_id: string;

	message_id: string;

	meta?: IGiveawayMetadata;
}

export const GiveawaySchema = new mongoose.Schema<IGiveawaySchama>(
	{
		_id: SchemaTypes.String,
		message_id: SchemaTypes.String,

		meta: {
			winner_count: {
				type: SchemaTypes.Number,
				default: 1,
			},

			title: {
				type: SchemaTypes.String,
			},

			description: {
				type: SchemaTypes.String,
			},

			expiration: SchemaTypes.Number,
		},
	},
	{ timestamps: true }
);
