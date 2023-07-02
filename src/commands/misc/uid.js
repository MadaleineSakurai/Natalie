const fs = require("fs");
const logUID = require("../../../logUID.json");

module.exports = {
  data: {
    name: "uid",
    description: "UID'ni Göster veya Kaydet.",
    options: [
      {
        name: "kaydet",
        type: 10,
        description: "UID Kaydet",
      },
      {
        name: "göster",
        type: 3,
        description: "UID Göster",
        choices: [
          {
            name: "Göster",
            value: "test2",
          },
          {
            name: "Göster (gizli)",
            value: "test3",
          },
        ],
      },
    ],
  },
  run: async ({ interaction }) => {
    const subcommand1 = interaction.options.getNumber("kaydet");
    const subcommand2 = interaction.options.getString("göster");
    if (subcommand1) {
      const uid = subcommand1.toString();
      if (uid.length !== 9 || isNaN(uid)) {
        await interaction.reply({
          content: "Lütfen geçerli bir UID numarası girin.",
          ephemeral: true,
        });
      } else if (
        !uid.startsWith("6") &&
        !uid.startsWith("7") &&
        !uid.startsWith("8") &&
        !uid.startsWith("9")
      ) {
        await interaction.reply({
          content: "UID numarası 6, 7, 8 veya 9 ile başlamalıdır.",
          ephemeral: true,
        });
      } else if (Object.values(logUID).includes(uid)) {
        await interaction.reply({
          content: "Bu UID zaten kayıtlı.",
          ephemeral: true,
        });
      } else {
        logUID[interaction.user.id] = uid;
        fs.writeFileSync("./logUID.json", JSON.stringify(logUID, null, 2));
        await interaction.reply({
          content: `UID numaranız başarıyla kaydedildi.`,
          ephemeral: true,
        });
      }
    } else if (subcommand2 === "test2") {
      const uid = logUID[interaction.user.id];
      if (!uid) {
        await interaction.reply({
          content: `UID numaranızı henüz kaydetmediniz.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply(`UID numaranız: ${uid}`);
      }
    } else if (subcommand2 === "test3") {
      const uid = logUID[interaction.user.id];
      if (!uid) {
        await interaction.reply({
          content: "UID numaranızı henüz kaydetmediniz.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `UID numaranız: "${uid}"`,
          ephemeral: true,
        });
      }
    }
  },
};
