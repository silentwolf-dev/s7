import mongoose from "mongoose";
import channel from "../commands/giveawaychannel";


export interface ISettingsChannelsSchama {
    giveaway_channel?: string,
    suggestion_channel?: string, 
}


export interface ISettingsSchama {
  _id: string,
  prefix: string,
  channels?: ISettingsChannelsSchama,
}


const channelSchama = new mongoose.Schema<ISettingsChannelsSchama>({
   giveaway_channel: mongoose.SchemaTypes.String,
   suggestion_channel: mongoose.SchemaTypes.String,
})


export const SettingSchama  = new mongoose.Schema<ISettingsSchama>({
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

