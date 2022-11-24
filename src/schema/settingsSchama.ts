import mongoose, { Document } from "mongoose";
import channel from "../commands/gsetup";


export interface ISettingsChannelDocument {
    giveaway_channel?: string,
    suggestion_channel?: string, 
}


export interface ISettingsDocument extends Document {
  _id: string,
  prefix: string,
  channels?: ISettingsChannelDocument,
}


const channelSchama = new mongoose.Schema<ISettingsChannelDocument>({
   giveaway_channel: mongoose.SchemaTypes.String,
   suggestion_channel: mongoose.SchemaTypes.String,
})


export const SettingSchama  = new mongoose.Schema<ISettingsDocument>({
  _id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  prefix: {
    type: mongoose.SchemaTypes.String,
    default: "!",
  },


  channels: channelSchama,

}, {timestamps: true})

