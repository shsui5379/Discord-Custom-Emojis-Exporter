const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs');
const https = require('https');

fs.mkdirSync("emojis");
fs.mkdirSync("stickers");

client.login(' /* API token goes here: get one from here: https://discord.com/developers/applications */ ');

client.on('ready', () => {
    for (var server of client.guilds.cache) {
        fs.mkdirSync("./emojis/" + server[1].id);
        for (var emoji of server[1].emojis.cache) {
            const url = emoji[1].url;
            const file = fs.createWriteStream("./emojis/" + server[1].id + "/" + url.substring(url.lastIndexOf("/"), url.length));
            https.get(url, function (response) {
                response.pipe(file);
            });
        }

        fs.mkdirSync("./stickers/" + server[1].id);
        for (var sticker of server[1].stickers.cache) {
            const url = sticker[1].url;
            const file = fs.createWriteStream("./stickers/" + server[1].id + "/" + url.substring(url.lastIndexOf("/"), url.length));
            https.get(url, function (response) {
                response.pipe(file);
            });
        }
    }
});