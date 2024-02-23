const express = require('express');
const path = require('path');
const app = express();
const {Telegraf} = require("telegraf");
const bot = new Telegraf("6271272669:AAFvdMfl_iTk-_VY-2G0nU_bBtTylsnZFhY");

bot.start((ctx) => ctx.reply('Welcome'));

bot.launch()
    .then(() => console.log('Bot started'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    console.log('Сервер запущен');
});
