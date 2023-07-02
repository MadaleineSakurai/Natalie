const { CommandKit } = require("commandkit");
const { Client, IntentsBitField, REST } = require("discord.js");
const path = require("path");
require("dotenv").config();
const NatalieToken = process.env.NatalieToken;
const ServerId = process.env.GUILD_ID;
const NatalieId = process.env.CLIENT_ID;
const rest = new REST({ version: "9" }).setToken(NatalieToken);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "./commands"),
  eventsPath: path.join(__dirname, "./events"),
  validationsPath: path.join(__dirname, "./validations"),
  devGuildIds: ["1092450783196368947"],
  devUserIds: ["302470971971993601", "1076655900791668867"],
});

client.login(NatalieToken);
