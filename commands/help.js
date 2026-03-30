const settings = require('../settings');
const os = require('os');
const fs = require('fs');

async function helpCommand(sock, chatId, message) {
    // Calculate Uptime
    const runtime = process.uptime();
    const hours = Math.floor(runtime / 3600);
    const minutes = Math.floor((runtime % 3600) / 60);
    const seconds = Math.floor(runtime % 60);
    const uptime = `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;

    // Calculate RAM
    const ramUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

    // Get Bot Mode
    let isPublic = true;
    try {
        if (fs.existsSync('./data/messageCount.json')) {
            const data = JSON.parse(fs.readFileSync('./data/messageCount.json'));
            if (typeof data.isPublic === 'boolean') isPublic = data.isPublic;
        }
    } catch (e) {}
    const mode = isPublic ? 'public' : 'private';

    // Count commands
    const cmdCount = 180; 

    const helpMessage = `
┌─────────────────────────┐
       *${settings.botName || 'MAZARI BOT'}*
   *ULTIMATE WHATSAPP BOT*
└─────────────────────────┘

╔═══════[ 🤖 *BOT INFO* ]═══════
║ 👑 *OWNER:* ${settings.botOwner || 'Sarukh Mazari'}
║ 🤖 *BOT:* ${settings.botName || 'MAZARI BOT'}
║ ⌨️ *PREFIX:* [ . ]
║ 🚪 *MODE:* ${mode}
║ ⏱️ *UPTIME:* ${uptime}
║ 📚 *CMDS:* ${cmdCount}
╚═══════════════════════════

╔═══════[ 💻 *SYSTEM* ]═══════
║ 🧠 *RAM:* ${ramUsage}MB / ${totalRam}GB
║ 📂 *PLATFORM:* ${process.platform}
║ 📅 *DATE:* ${new Date().toLocaleDateString()}
║ ⌚ *TIME:* ${new Date().toLocaleTimeString()}
╚═══════════════════════════

╔═══════[ 🌐 *GENERAL* ]═══════
║ .help
║ .menu
║ .ping
║ .alive
║ .owner
║ .repo
║ .groupinfo
║ .staff
║ .jid
║ .url
║ .dp
╚═══════════════════════════

╔═══════[ 📥 *DOWNLOADS* ]═══════
║ .facebook
║ .instagram
║ .tiktok
║ .twitter
║ .threads
║ .threads
║ .play
║ .song
║ .video
║ .ytmp4
║ .spotify
║ .lyrics
╚═══════════════════════════

╔═══════[ 🎨 *CONVERTERS* ]═══════
║ .sticker
║ .simage
║ .blur
║ .remini
║ .removebg
║ .crop
║ .attp
║ .emojimix
║ .take
╚═══════════════════════════

╔═══════[ 👮 *ADMINS* ]═══════
║ .kick
║ .add
║ .ban
║ .unban
║ .promote
║ .demote
║ .mute
║ .unmute
║ .tagall
║ .hidetag
║ .antilink
║ .antitag
║ .welcome
║ .goodbye
╚═══════════════════════════

╔═══════[ 🔒 *OWNER* ]═══════
║ .mode
║ .clearsession
║ .update
║ .autostatus
║ .autoreact
║ .autotyping
║ .autoread
║ .anticall
║ .pmblocker
╚═══════════════════════════

╔═══════[ 🎮 *GAMES/FUN* ]═══════
║ .tictactoe
║ .hangman
║ .trivia
║ .truth
║ .dare
║ .meme
║ .joke
║ .quote
║ .compliment
║ .insult
║ .ship
║ .simp
║ .stupid
╚═══════════════════════════

╔═══════[ 🤖 *AI CMDS* ]═══════
║ .gpt
║ .gemini
║ .imagine
║ .flux
║ .sora
╚═══════════════════════════

*📢 Official Channel*
🔗 ${settings.channelLink || 'https://whatsapp.com/channel/0029VbBRITODzgTGQhZSFT3P'}
${settings.channelLink2 ? `🔗 ${settings.channelLink2}` : ''}

*✨ Powered by ${settings.botName || 'MAZARI BOT'} 🤖*`.trim();

    try {
        const dpPath = settings.connectionImagePath || './assets/images/DP.png';
        if (fs.existsSync(dpPath)) {
            await sock.sendMessage(chatId, {
                image: { url: dpPath },
                caption: helpMessage,
                contextInfo: global.channelInfo?.contextInfo
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, {
                text: helpMessage,
                contextInfo: global.channelInfo?.contextInfo
            }, { quoted: message });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage }, { quoted: message });
    }
}

module.exports = helpCommand;