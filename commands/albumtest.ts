import { Message, MessageFlags, MessageEmbed, MessageAttachment, MessagePayload, Base } from "discord.js";
import { ICommand } from "wokcommands";
import { Canvas, createCanvas, loadImage } from "canvas";
import { Image } from "canvas";

export default {
    category: 'Testing',
    description: 'Collecting',
    testOnly: true,
    slash: true,

    callback: ({ interaction, channel }) => {        
        //Generate Canvas
        const width = 925;
        const height = 1300;
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        
        //Get Album image & Draw
        var img = new Image();
        img.src = "./images/albumpg1.png"
        context.drawImage(img, 0, 0);

        //Test Draw
        var charImage = new Image();
        charImage.src = "./images/L.png";
        context.drawImage(charImage, 631, 87);
        //Generate Attachment
        //var attach = new MessageAttachment(canvas.toBuffer(), "Album");        

        interaction.reply({
            files: [ { attachment: canvas.toBuffer() }]
        })
        
        
    }
} as ICommand