const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs');
const https = require('https');

fs.mkdirSync("emojis");

client.login(' /* API token goes here: get one from here: https://discord.com/developers/applications */ ');

client.on('ready', () => {
    for (var server of client.guilds.cache) {
        for (var emoji of server[1].emojis.cache) {
            const url = emoji[1].url;
            const file = fs.createWriteStream("./emojis/" + url.substring(url.lastIndexOf("/"), url.length));
            https.get(url, function (response) {
                response.pipe(file);
            });
        }
    }
});