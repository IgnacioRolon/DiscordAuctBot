import { GuildMember, Message, MessageEmbed, MessageFlags, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Auctioning',
    description: 'Start an auction.',
    testOnly: true,
    slash: true,
    minArgs: 2,
    expectedArgs: '<character name> <starting value>',

    callback: ({ interaction, channel, args }) => {
        let characterName = args[0];
        let startingValue = args[1];

        const embed = new MessageEmbed()
            .setDescription("Character: " + characterName)
            .setTitle('Auction starting now!')
            .setColor('BLUE')
            .addField('Starting Value', startingValue)

        interaction.reply({
            embeds: [embed]
        })     
        
        let startingInt: number = Number.parseInt(startingValue);
        let minimumValue = startingInt; //+ (startingInt * 0.05);

        interaction.channel?.send('Respond with ".<value>" to join the auction!');

        let auctionTime: number = 20;
        let member:GuildMember = interaction.member as GuildMember;
        const filter = (msg: Message) => {
            return /*msg.author.id !== member.id && */msg.content.startsWith('.');
        };
        const collector = channel.createMessageCollector({
            filter,
            idle: 1000 * auctionTime
        });
        let value: number;
        let currentBidder: User;
        let validAuction: boolean = false;
        collector.on('collect', message => {
            console.log(message.content);
            value = Number.parseInt(message.content.substring(1));
            if(isNaN(value)) message.reply("That's not a valid kakera amount!");
            if(!isNaN(value) && value < minimumValue) message.reply(`That number is below the current minimum value of ${minimumValue}ka.`)

            if(!isNaN(value) && value >= minimumValue){
                validAuction = true;
                currentBidder = message.author;
                minimumValue = value + (value * 0.05);
                message.channel.send(`${currentBidder} offers ${value.toString()}ka! Offers are now starting from ${minimumValue.toString()}ka!`)
            }
        });

        collector.on('end', collected => {
            if(validAuction === true){
                interaction.channel?.send('No one joined the auction. Closing auction.');
                return;
            }
            
            let text = `${currentBidder} won the auction for ${value.toString()}! ${interaction.member} can trade the character now.`;
            interaction.channel?.send(text);
            
        });
    }
} as ICommand