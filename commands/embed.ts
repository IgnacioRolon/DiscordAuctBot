import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Development',
    description: 'Sends an embed',
    permissions: ['ADMINISTRATOR'],
    slash: false,
    testOnly: true,
    
    callback: async ({ message }) => {
        const embed = new MessageEmbed()
            .setDescription("This is an embed!")
            .setTitle('Embed title')
            .setColor('BLUE')
            .addField('Field title', 'Field value')

        const newMessage = await message.reply({
            embeds: [embed]
        })

        await new Promise(resolve => setTimeout(resolve, 5000));

        const newEmbed = newMessage.embeds[0];
        newEmbed.setTitle('Edited Title');

        newMessage.edit({
            embeds: [newEmbed]
        })
    },
} as ICommand