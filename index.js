var TelegramBot  = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '690870525:AAHGWi2sukLsCpwNvPLHsfy8-dYe8dxDC3M';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
/*
bot.onText(/echo (.+)/, function (msg, match) {
var fromId = msg.from.id;
var resp = match[1];
bot.sendMessage(fromId, resp);
});
*/

/**
 * Хуй-редупликация текста.
 * @param {string} text Исходный текст
 * @returns {string} Возвращает результат хуй-редупликации
 */

// Все русские буквы
var allRu = 'а-яё';
// Все русские гласные
var vowelsRu = 'аеёиоуэюя';

function huiReduplicate(text) {
    // Внутренний регвыр, чтоб не создавать каждый раз объёкт заново
    var subRegex = new RegExp('[^' + vowelsRu + ']*([' + vowelsRu + '])');

    // Для всех русских слов вызываем внутренний регвыр
    return text.replace(new RegExp('[' + allRu + ']+', 'g'), function (word) {
        return word.replace(subRegex, function ($0, $1) {
            var rep = null;
            switch ($1) {
                case 'а':
                    // шапка → хуяпка
                    rep = 'я';
                    break;
                case 'о':
                    // опера → хуёпера
                    rep = 'ё';
                    break;
                case 'у':
                    // ушко → хуюшко
                    rep = 'ю';
                    break;
                case 'э':
                    // эльф → хуельф
                    rep = 'е';
                    break;

                default:
                    rep = $1;
                    break;
            }
            return 'ху' + rep;
        });
    });
}

var notes = [];

// Простая команда без параметров.
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
    var photo = 'https://lh3.googleusercontent.com/mabGkxi0qCNxn_XaCGxwmcE8-p_deWRVyUB3s_FZAb3_2TcxvnB85CFDb3EbN-N3u-B_2swdOe0ct9eiXbsFXAst4T2ruw3wumZuLRA6OHHnuX4nutcFmqJgUSTTyHBJazxg0-RF3y9xx15s6HIxAnE8KpKSEQaiuaj_bGufcJQJojMRuMcEsaM3hcIll9lYAGpgWXfVjGbtv__tDnqkMXJrxuDfSPVtwmKsRtoRqdWPdjVLUzP2TDn6ji6RuhDr5XQ7YXQqkiEscYSugnVyC9VCvUxUqrfwetNlVXdyQmkp1ciWxQzTh_EHqzQel0vIjImmnYbCHi36uvaB0XApjlsjGn-pIq1L894UAl5IT0OVzVdlZUbd4zJgLUBDZYgFGj4he5mKpckadwyKUozMzBo93dTxjjtKTNauZoWXlR8HqQQ2oc9RTvCMy3Vex9wwv0dwSaUvTs2eSW1oM7bPLlkK1xwfyYtOcSlTTPywU68y2lv9XzLnxIqNH_rsUN0eeFlHpBLGQEOEUVsApcPIh540TgbNTb386lVyem1d1jdUmdMmkgYvR3TamJ6Dsgb01bGJeJZGm9i8edbG7X2VyHT4S5l6WuIpEPIRLM56-b18-fl0yOVOOVHG6UMr4CpJ8FRkZ9mjBeBQVHx3htMlaRrJc7tAzxtG=w703-h937-no';
    //bot.sendPhoto(chatId, photo, {caption: 'Node test send image'});
    //bot.sendMessage(chatId,  chatId);
});

bot.onText(/(.+)/, function (msg, match) {
    var userId = msg.from.id;
    var userName = msg.from.first_name;
    var text = match[1];
    var time = match[2];

    bot.sendMessage(userId, huiReduplicate(text));

    //notes.push({ 'uid': userId, 'time': time, 'text': text });

    //bot.sendMessage(userId, `Отлично ${userName}! Я обязательно напомню ${text} в ${time}, если не сдохну :)`);
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if ( notes[i]['time'] == curDate ) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
            notes.splice(i,1);
        }
    }
},1000);