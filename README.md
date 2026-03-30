# 🤖 MAZARI BOT - WhatsApp Multi-Device Bot

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Professional WhatsApp Bot with 100+ Commands**

*Powered by Baileys Multi-Device*

</div>

---

## ✨ Features

### 🎯 **Core Features**
- 🤖 **100+ Commands** - Comprehensive command library
- 👥 **Group Management** - Complete admin tools
- 🛡️ **Auto Moderation** - Anti-link, anti-badword, anti-tag
- 🎮 **Games** - Tic-tac-toe, Hangman, Trivia
- 🤖 **AI Integration** - ChatGPT, Gemini, Image Generation
- 📥 **Media Downloaders** - Instagram, TikTok, Facebook, YouTube
- 🎨 **Sticker Maker** - Create custom stickers
- ⚡ **Auto Features** - Auto-read, auto-typing, auto-status

### 🌟 **Advanced Features**
- 🔒 **Private/Public Mode** - Control bot access
- 📵 **Anti-Call Protection** - Block unwanted calls
- 🚫 **PM Blocker** - Block private messages
- 💾 **Anti-Delete** - Save deleted messages
- 🎭 **Anime Reactions** - Fun anime GIFs
- 🔤 **Text Maker** - 18+ text effects
- 🎯 **Fun Commands** - Memes, jokes, quotes, and more

---

## 📋 Requirements

- **Node.js** v18 or higher
- **Git** (for cloning)
- **FFmpeg** (for media processing)
- **WhatsApp Account** (for pairing)

---

## 🚀 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sarukhmazari/MazariOfficial.git
cd MazariOfficial
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Bot
Edit `settings.js` to customize:
```javascript
{
  botName: "Your Bot Name",
  botOwner: "Your Name",
  ownerNumber: "923XXXXXXXXX" // Your number without +
}
```

### 4️⃣ Start Bot
```bash
npm start
```

### 5️⃣ Connect WhatsApp
- Enter your phone number when prompted
- You'll receive a pairing code
- Open WhatsApp → Settings → Linked Devices → Link a Device
- Enter the pairing code

---

## 📝 Commands

### 🌐 General Commands
```
.menu          - Show all commands
.ping          - Check bot response time
.alive         - Check if bot is running
.owner         - Get owner contact
.help          - Show help menu
```

### 👮‍♂️ Admin Commands
```
.kick @user    - Remove user from group
.ban @user     - Ban user from bot
.promote @user - Make user admin
.demote @user  - Remove admin
.mute <min>    - Mute group
.antilink      - Toggle anti-link
.tagall        - Tag all members
```

### 🔒 Owner Commands
```
.mode <public/private>  - Change bot mode
.autostatus <on/off>    - Auto view statuses
.autotyping <on/off>    - Auto typing indicator
.autoread <on/off>      - Auto read messages
.anticall <on/off>      - Block calls
.settings               - View bot settings
```

### 🤖 AI Commands
```
.gpt <question>     - Ask ChatGPT
.gemini <question>  - Ask Gemini AI
.imagine <prompt>   - Generate image
.flux <prompt>      - Flux AI image
.sora <prompt>      - Sora AI video
```

### 📥 Downloaders
```
.play <song>        - Download music
.song <song>        - Download song
.tiktok <link>      - Download TikTok
.instagram <link>   - Download Instagram
.facebook <link>    - Download Facebook
.spotify <query>    - Download Spotify
```

### 🎮 Games
```
.tictactoe @user - Play tic-tac-toe
.hangman         - Word guessing game
.trivia          - Trivia questions
.truth           - Truth question
.dare            - Dare challenge
```

### 🎨 Sticker & Image
```
.sticker       - Create sticker (reply to image)
.take <name>   - Change sticker pack name
.blur          - Blur image
.removebg      - Remove background
.remini        - Enhance image quality
```

**[View Full Command List](QUICK_START.md)**

---

## ⚙️ Configuration

### Bot Settings (`settings.js`)
```javascript
{
  packname: 'MAZARI BOT',
  author: 'Sarukh Mazari',
  botName: "MAZARI BOT",
  botOwner: 'Sarukh Mazari',
  ownerNumber: '923232391033',
  commandMode: "public",
  version: "1.0.0"
}
```

### API Configuration (`config.js`)
Configure external API keys for enhanced features.

---

## 🛡️ Security Features

- ✅ **Anti-Link** - Automatically removes group invite links
- ✅ **Anti-Badword** - Filters inappropriate language
- ✅ **Anti-Tag** - Prevents mass tagging
- ✅ **Anti-Delete** - Saves deleted messages
- ✅ **Anti-Call** - Blocks incoming calls
- ✅ **PM Blocker** - Blocks private messages
- ✅ **Ban System** - Ban users from using bot

---

## 📊 Project Structure

```
MazariOfficial/
├── commands/          # 100+ command files
├── lib/              # Utility libraries
├── data/             # Bot data storage
├── assets/           # Images and media
├── index.js          # Main entry point
├── main.js           # Message handler
├── settings.js       # Bot configuration
├── config.js         # API configuration
└── package.json      # Dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## ⚠️ Disclaimer

- This bot is for **educational purposes** only
- Using bots may violate WhatsApp's Terms of Service
- Your account may be banned
- Use at your own risk
- Not affiliated with WhatsApp Inc.

### Legal Notice
- ❌ Do not use for spam
- ❌ Do not use for illegal activities
- ❌ Do not harass users
- ✅ Respect user privacy
- ✅ Follow local laws

---

## 📄 License

This project is licensed under the MIT License.

### Credits
- **Original Base:** Knight Bot by Professor
- **Baileys Library:** [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys)
- **Modified by:** Sarukh Mazari

---

## 📞 Support

- **Owner:** Sarukh Mazari
- **GitHub:** [@sarukhmazari](https://github.com/sarukhmazari)

---

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by Sarukh Mazari**

*Professional WhatsApp Bot Solution*

</div>
