import { Events, Interaction } from "discord.js";
import client from "../client";
export = {
    name: Events.InteractionCreate,
    once: false,
    run: async (client: client, interaction: Interaction)=> {
       if(!interaction.isChatInputCommand()) return;

      const command = client.commands.get(interaction.commandName)


      try {
         await command.execute(interaction, client)
      } catch (error) {
         console.error(error)
         
         await interaction.reply("error occured when executing this command")
      }

    }
}