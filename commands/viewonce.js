const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const isOwnerOrSudo = require('../lib/isOwner');

// Path to store VV mode
const modePath = path.join(__dirname, '../data/vvMode.json');

// Helper to get current mode
function getVVMode() {
    try {
        if (!fs.existsSync(modePath)) {
            return 'public'; // Default to public
        }
        const data = JSON.parse(fs.readFileSync(modePath));
        return data.mode || 'public';
    } catch (e) {
        return 'public';
    }
}

// Helper to set mode
function setVVMode(mode) {
    try {
        const dir = path.dirname(modePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(modePath, JSON.stringify({ mode }));
        return true;
    } catch (e) {
        console.error('❌ [VV BUG-FIX] Failed to save mode:', e);
        return false;
    }
}

/**
 * .vv command - Strictly Enforced Mode System
 * .vv private / .vv public -> Change Mode
 * .vv -> Extract and Send based on Mode
 */
async function viewonceCommand(sock, chatId, message) {
    try {
        const senderId = message.key.participant || message.key.remoteJid;
        const text = (
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            ''
        ).trim().toLowerCase();
        
        const args = text.split(/\s+/);
        const subCommand = args[1];

        // 🟢 1. Handle Mode Configuration (Highest Priority)
        if (subCommand === 'private' || subCommand === 'public') {
            const isOwner = await isOwnerOrSudo(senderId, sock, chatId);
            if (!isOwner) {
                return await sock.sendMessage(chatId, { text: '❌ Only owner can change VV mode' }, { quoted: message });
            }
            
            const newMode = subCommand;
            setVVMode(newMode);
            const responseText = newMode === 'private' ? '🔒 VV set to PRIVATE mode' : '🌐 VV set to PUBLIC mode';
            return await sock.sendMessage(chatId, { text: responseText }, { quoted: message });
        }

        // 🛡️ 2. Reply Validation
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            return await sock.sendMessage(chatId, { text: '❌ Reply to a view-once message.' }, { quoted: message });
        }

        const vOnce = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessage?.message || quoted;
        const quotedImage = vOnce.imageMessage;
        const quotedVideo = vOnce.videoMessage;
        const quotedAudio = vOnce.audioMessage;

        // 📋 3. Prepare Media Extraction
        let mediaContent, mediaType, fileName, mimeType, caption;
        if (quotedImage && (quotedImage.viewOnce || vOnce === quoted.viewOnceMessage?.message || vOnce === quoted.viewOnceMessageV2?.message)) {
            mediaContent = quotedImage;
            mediaType = 'image';
            fileName = 'media.jpg';
            mimeType = 'image/jpeg';
            caption = quotedImage.caption || '';
        } else if (quotedVideo && (quotedVideo.viewOnce || vOnce === quoted.viewOnceMessage?.message || vOnce === quoted.viewOnceMessageV2?.message)) {
            mediaContent = quotedVideo;
            mediaType = 'video';
            fileName = 'media.mp4';
            mimeType = 'video/mp4';
            caption = quotedVideo.caption || '';
        } else if (quotedAudio && (quotedAudio.viewOnce || vOnce === quoted.viewOnceMessage?.message || vOnce === quoted.viewOnceMessageV2?.message)) {
            mediaContent = quotedAudio;
            mediaType = 'audio';
            fileName = 'media.mp3';
            mimeType = 'audio/mpeg';
            caption = '';
        } else {
            return await sock.sendMessage(chatId, { text: '❌ Reply to a view-once message' }, { quoted: message });
        }

        // 📥 4. Download Content
        const stream = await downloadContentFromMessage(mediaContent, mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        // 🔒 5. Mode Enforcement (STRICT)
        const currentMode = getVVMode();
        const isGroup = chatId.endsWith('@g.us');

        // Debug Log
        console.log(`📡 [VV-DEBUG] MODE: ${currentMode} | CHAT: ${isGroup ? 'Group' : 'Private'} | SENDER: ${senderId}`);

        if (currentMode === 'private') {
            // ✅ ACTION: Forward ONLY to owner
            console.log(`🛡️ [VV-DEBUG] STRICT ENFORCEMENT: Blocking group output, sending to owner only.`);

            const targetSenderId = message.message?.extendedTextMessage?.contextInfo?.participant || message.key.participant || message.key.remoteJid;
            const senderName = message.pushName || targetSenderId.split('@')[0];
            
            let chatName = 'Private Chat';
            if (isGroup) {
                try {
                    const groupMetadata = await sock.groupMetadata(chatId);
                    chatName = groupMetadata.subject;
                } catch (e) {
                    chatName = 'Unknown Group';
                }
            }

            const ownerJid = settings.ownerNumber.includes('@') ? settings.ownerNumber : `${settings.ownerNumber}@s.whatsapp.net`;
            const reportText = `👤 *From:* ${senderName}\n📌 *Chat:* ${chatName}\n\n📝 *Caption:* ${caption || 'None'}`;

            try {
                if (mediaType === 'image') {
                    await sock.sendMessage(ownerJid, { image: buffer, caption: reportText });
                } else if (mediaType === 'video') {
                    await sock.sendMessage(ownerJid, { video: buffer, caption: reportText });
                } else if (mediaType === 'audio') {
                    await sock.sendMessage(ownerJid, { audio: buffer, mimetype: mimeType, ptt: false });
                    await sock.sendMessage(ownerJid, { text: reportText });
                }

                // Small confirmation message in original chat
                await sock.sendMessage(chatId, { text: '✅ Sent to owner privately' });

                // 🛑 CRITICAL: Stop execution here to prevent ANY group output
                return;

            } catch (e) {
                console.error('❌ [VV-DEBUG] Private DM failed:', e);
                // Even if DM fails, we must NOT send in group if mode is private
                return await sock.sendMessage(chatId, { text: '❌ Failed to send media privately' });
            }
        } 
        
        // 🌐 6. Public Logic (Else branch)
        console.log(`🌐 [VV-DEBUG] PUBLIC MODE: Sending back to original chat.`);
        const options = { quoted: message };
        if (mediaType === 'image') {
            await sock.sendMessage(chatId, { image: buffer, caption: caption }, options);
        } else if (mediaType === 'video') {
            await sock.sendMessage(chatId, { video: buffer, caption: caption }, options);
        } else if (mediaType === 'audio') {
            await sock.sendMessage(chatId, { audio: buffer, mimetype: mimeType, ptt: false }, options);
        }

    } catch (error) {
        console.error('❌ [VV-DEBUG] Fatal error:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to process command!' });
    }
}

module.exports = viewonceCommand;