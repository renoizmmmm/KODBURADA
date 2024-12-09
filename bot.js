const TelegramBot = require('node-telegram-bot-api');

// Bot tokenini buraya yapıştır
const token = '7290928892:AAEGV7FAKrbHluImTLsaFfSK9jiapOh7PSQ';

// Yeni bot oluştur
const bot = new TelegramBot(token, { polling: true });

// /start komutunu dinle
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Inline Keyboard ile buton ekle
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Siteme Git', url: 'https://revion5.vercel.app/login.html' } // URL'yi buraya koy
                ]
            ]
        }
    };

    // Butonlu mesaj gönder
    bot.sendMessage(chatId, 'Hoş geldin! Aşağıdaki butona tıklayarak siteme gidebilirsin.', options);
});

// Diğer mesajları dinle
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const receivedText = msg.text;

    if (receivedText !== '/start') {
        bot.sendMessage(chatId, `Şunu söyledin: ${receivedText}`);
    }
});

console.log('Bot çalışıyor!');
