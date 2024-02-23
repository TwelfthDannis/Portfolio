const { Telegraf } = require("telegraf");

const bot = new Telegraf("6271272669:AAFvdMfl_iTk-_VY-2G0nU_bBtTylsnZFhY");

function Telegram(){
    bot.start((ctx) => ctx.reply('Welcome'));

    bot.launch()
        .then(() => console.log('Bot started'))
        .catch((err) => console.error(err));
}
