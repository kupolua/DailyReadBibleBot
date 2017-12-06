const Telegraf = require('telegraf')

const bot = new Telegraf('486045535:AAFkOtXCVjSOQl1PMh94DZ1R5I1MsKpSGBk')
bot.on('text', ({ reply }) => {
    console.log('hey');
    reply('Hey there!')
})

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://jsqkghetru.localtunnel.me/sendPlan/')

// Start https webhook
// FYI: First non-file reply will be served via webhook response
bot.startWebhook('/sendPlan/', null, 3013)