from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from googlesearch import search

# Telegram kanalınızın linkini buraya ekleyin
TELEGRAM_CHANNEL_LINK = "https://t.me/erenzeroin"

# PDF arama fonksiyonu
def find_pdf(book_name):
    query = f"{book_name} filetype:pdf"
    search_results = []
    try:
        for result in search(query, num_results=5):  # 5 sonuç alıyoruz
            if result.endswith(".pdf"):
                search_results.append(result)
        return search_results
    except Exception as e:
        print(f"Arama sırasında hata oluştu: {e}")
        return None

# /start komutu
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Kanal linki için buton
    keyboard = [
        [InlineKeyboardButton("📢 Kanalımıza Katıl", url=TELEGRAM_CHANNEL_LINK)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Mesaj ve buton gönderimi
    await update.message.reply_text(
        "Merhaba! Ben bir kitap PDF arama botuyum. Bana bir kitap ismi gönder, senin için PDF'ini bulmaya çalışayım.\n\n"
        "Ayrıca kanalımıza katılarak duyurularımızı takip edebilirsin!",
        reply_markup=reply_markup
    )

# Kitap arama fonksiyonu
async def search_book(update: Update, context: ContextTypes.DEFAULT_TYPE):
    book_name = update.message.text
    await update.message.reply_text(f"📚 '{book_name}' için PDF arıyorum, lütfen bekle...")
    
    pdf_links = find_pdf(book_name)
    if pdf_links:
        response = "🔗 İşte bulduğum PDF dosyaları:\n"
        for link in pdf_links:
            response += f"- {link}\n"
        await update.message.reply_text(response)
    else:
        await update.message.reply_text("❌ Üzgünüm, aradığınız kitapla ilgili PDF dosyası bulamadım.")

# Hata işleyici
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f"Update {update} hata nedeniyle başarısız oldu: {context.error}")

# Ana fonksiyon
def main():
    bot_token = "7829638806:AAFSA8u4z8u6GgeOsT4BhgWP14gSIq62Tqg"

    # Bot uygulamasını başlat
    application = Application.builder().token(bot_token).build()

    # Komut ve mesaj işleyiciler
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, search_book))

    # Botu çalıştır
    application.run_polling()

if __name__ == '__main__':
    main()
