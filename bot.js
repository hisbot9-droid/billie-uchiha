const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const bot = new TelegramBot(TOKEN);
const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Billie Uchiha Bot is running");
});

app.listen(PORT, async () => {
  console.log("🤖 Billie Uchiha Bot started");

  if (WEBHOOK_URL) {
    await bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🔥 *Billie Uchiha Bot*\nChoose an option:",
    {
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [
          ["💬 GPT", "🧠 DeepSeek"],
          ["🔊 TTS", "📸 IG Stalk"],
          ["ℹ Help"]
        ],
        resize_keyboard: true
      }
    }
  );
});
