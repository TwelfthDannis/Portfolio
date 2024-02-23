const {Telegraf} = require("telegraf");
const {createServer} = require("http");

const bot = new Telegraf("6271272669:AAFvdMfl_iTk-_VY-2G0nU_bBtTylsnZFhY");

bot.start((ctx) => ctx.reply('Welcome'));

const server = createServer(bot.webhookCallback('/secret-path'));
server.listen(63342, () => {
    console.log('Server is running');
});