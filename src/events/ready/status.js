require("dotenv").config();
const { ActivityType } = require("discord.js");

let status = [
  {
    name: "Madaleine",
    type: ActivityType.Watching,
  },
  {
    name: "Weapon (feat. Baum)",
    type: ActivityType.Listening,
  },
  {
    name: "Genshin Impact",
    type: ActivityType.Playing,
  },
];

function startClient(client) {
  console.log(`✅ ${client.user.tag} is ready!`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 12000);
}

module.exports = (client) => {
  startClient(client);
};
