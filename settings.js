const settings = {
  packname: process.env.BOT_PACKNAME || 'MAZARI BOT',
  author: process.env.BOT_AUTHOR || 'Sarukh Mazari',
  botName: process.env.BOT_NAME || "MAZARI BOT",
  botOwner: process.env.BOT_OWNER || 'Sarukh Mazari',
  ownerNumber: process.env.OWNER_NUMBER || '923232391033', // Pakistan number format without + symbol
  giphyApiKey: process.env.GIPHY_API_KEY || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  commandMode: process.env.BOT_MODE || "public",
  maxStoreMessages: parseInt(process.env.MAX_STORE_MESSAGES || '20'),
  storeWriteInterval: parseInt(process.env.STORE_WRITE_INTERVAL || '10000'),
  description: "Professional WhatsApp bot for managing groups and automating tasks.",
  version: "1.0.0",
  updateZipUrl: "",
  channelLink: "https://whatsapp.com/channel/0029VbBRITODzgTGQhZSFT3P",
<<<<<<< HEAD
  channelLink2: "https://whatsapp.com/channel/0029Vb6GUj8BPzjOWNfnhm1B",
  newsletterJid: "120363404139113188@newsletter",
  connectionImagePath: "./assets/images/DP.png",
=======
  newsletterJid: "120363404139113188@newsletter",
  connectionImagePath: "./assets/connection.png",
>>>>>>> 7f087b49e4e395a80286b61562dbad0c4c70dcc6
};

module.exports = settings;
