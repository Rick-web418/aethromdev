const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const cors = require("cors");

const app = express();
app.use(cors());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers]
});

// Senin Discord User ID'ni buraya yaz (ör: "123456789012345678")
const USER_ID = "900755693525671937";

client.on("ready", () => {
  console.log(`Bot giriş yaptı: ${client.user.tag}`);
});

app.get("/status", async (req, res) => {
  try {
    const guild = client.guilds.cache.first();
    if (!guild) return res.json({ status: "unknown" });

    const member = await guild.members.fetch(USER_ID);
    const status = member.presence ? member.presence.status : "offline";

    res.json({
      username: member.user.username,
      status: status
    });
  } catch (err) {
    console.error(err);
    res.json({ status: "error" });
  }
});

// Bot Tokenini buraya yaz
client.login("MTQwNjUyMzAyMzI1NDg4MDI1Ng.GMjGjZ.52P1Bh8YuVRw7g01fAwBTfMFF13ZgBis-bbdC4");

app.listen(3000, () => {
  console.log("API çalışıyor: http://localhost:3000/status");
});