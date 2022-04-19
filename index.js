// Load up the discord.js library
const Discord = require("discord.js");

/*
 DISCORD.JS VERSION 11 CODE
*/

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client({disableEveryone: false});

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users.`); 
});

var busy = false

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  //if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "qauction"){
	quickAuction(message);
  }

  if(command === "collectortest"){
	const filter = m => m.content.includes('hi');
	const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
	
	collector.on('collect', m => {
		console.log(`Collected ${m.content}`);
	});
	
	collector.on('end', collected => {
		console.log(`Collected ${collected.size} items`);
	});
  }
});

//---------- MODULES -------------

function quickAuction(message){
	var amount = args.shift();
	var character = "";
	args.forEach(element => {
		character = character + element + " ";
	});
	character.trim();

	if(isNaN(amount) || character === ""){
		sendMessage(message, "The selected amount is not a number or you're missing an argument!")
		return;
	}
}

//--------- UTILS ---------------

function compareNumbers(a, b) {
	return b - a;
}

function sendMessage(message, text)
{
	message.channel.send(text);
}

client.login(config.token);


/*

var currentTurn = 0;
var busyTurn = 0;

var playersPlayed = [];
var playersPlaying = [];
var scoreboard = [];

if(command === "testm"){
	message.channel.send(`$imakr Rem`);
  }

  if(command === "unirse"){
  	if(!playersPlaying.includes(message.author.toString()))
  	{
  		playersPlaying.push(message.author.toString());
	  	scoreboard.push(0);
	  	message.channel.send(`${message.author.toString()} te has unido al juego!`);
	}else{
		message.channel.send(`${message.author.toString()} ya estas en el juego!`);
	}
	  	
  }

  if(command === "abrir"){
  	if(currentTurn === 0)
  	{
  		message.channel.send("Turno iniciado. ¡A jugar!");
	  	currentTurn = 1;
	}else{
		message.channel.send("Ya hay un turno en curso.");
	}  	
  }

  if(command === "cerrar"){
  	if(currentTurn === 1)
  	{
  		message.channel.send("Turno finalizado. Escribe .abrir para iniciar el proximo turno.");
  		currentTurn = 0;
  		playersPlayed = [];
  	}else{
  		message.channel.send("No hay un turno en curso.");
  	}
  }

  if(command === "jugar"){
  	if(currentTurn === 1 && busyTurn === 0 && !playersPlayed.includes(message.author.toString()) && playersPlaying.includes(message.author.toString()))
  	{
  		var seconds = 5;  		
  		busyTurn = 1;
  		message.channel.send(`${message.author.toString()} tu turno! Tienes 5 segundos para responder.`);
  		setTimeout(function() {
  			message.channel.send(`${message.author.toString()} se terminó tu turno!`);
  			busyTurn = 0;
  			playersPlayed.push(message.author.toString());
  		}, 7000);
  	}else if(currentTurn === 0)
  	{
  		message.channel.send("No hay un turno en curso.");
  	}else if(busyTurn === 1 || playersPlayed.includes(message.author.toString())){
  		message.delete().catch(O_o=>{});
  	}
  }

  if(command === "sumar"){
  	var user = args[0].replace('!', '');
  	if(playersPlaying.includes(user))
  	{
  		var pos = playersPlaying.indexOf(user);
	  	var currentScore = scoreboard[pos];
	  	currentScore = parseInt(currentScore, 10) + parseInt(args[1], 10);
	  	scoreboard[pos] = currentScore;
	  	message.channel.send(`${user} ha ganado ${args[1]} puntos!`);
	}	  	
  }

  if(command === "restar"){
  	var user = args[0].replace('!', '');
  	if(playersPlaying.includes(user))
  	{
  		var pos = playersPlaying.indexOf(user);
	  	var currentScore = scoreboard[pos];
	  	currentScore = parseInt(currentScore, 10) - parseInt(args[1], 10);
	  	scoreboard[pos] = currentScore;
	  	message.channel.send(`${user} ha perdido ${args[1]} puntos`);
	}	  	
  }

  if(command === "puntajes"){
  	var currentPos, scorePos = 0;
  	var scoreMessage = "Puntajes: \n\n";
  	var sortedScoreboard = scoreboard.slice();
  	var originalScoreboard = scoreboard.slice();
  	sortedScoreboard.sort(compareNumbers);
  	sortedScoreboard.forEach(function(value){
  		currentPos = originalScoreboard.indexOf(value);
  		scoreMessage += `${scorePos += 1}.  ${playersPlaying[currentPos]} - ${scoreboard[currentPos].toString()} puntos.\n`;
  		originalScoreboard[currentPos] = -1;
  	});
  	message.channel.send(scoreMessage);
  }
*/