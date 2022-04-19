import { Message, MessageFlags } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Collecting',

    callback: ({ message, channel }) => {
        message.reply('Enter your name');

        const filter = (msg: Message) => {
            return msg.author.id === message.author.id;
        };       

        const collector = channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 20
        });

        collector.on('collect', message => {
            console.log(message.content);
        });

        collector.on('end', collected => {
            if(collected.size === 0){
                message.reply('No message provided.');
                return;
            }

            let text = 'Collected: \n';
            collected.forEach((message) => {
                text += `${message.content}\n`;
            });

            message.reply(text);
        });
    }
} as ICommand