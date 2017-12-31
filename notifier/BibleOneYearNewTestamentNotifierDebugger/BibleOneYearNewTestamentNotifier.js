    const TEXT_MAX_LENGTH = 3900;
    const CHAT_ID = '-1001099154943'; //https://t.me/joinchat/DwQgSUGDxf_tgC4TcmdeNQ ІБЦ Група Церковної родини
    const requestURL = 'https://api.telegram.org/bot499291228:AAHubvjndSbgxax0PauFpAsmy4XYFz9xRTI/sendMessage?chat_id=' + CHAT_ID + '&text=';
    var utf8 = require('utf8');
    var request = require('request');
    var BibleOneYearNewTestamentPlan = require('./BibleOneYearNewTestamentPlan.json');
    var getReadingPlanMap = require('./getReadingPlanMap');
    var dayNumber = require('./getDayNumber');
    var BibleMap = require('./JsonToMapConverter');
    var getBibleLink = require('./getDayPlanLink');
    var readingPlanMap;
    var dailyReadingPlan;
    var BibleText = '';
    var BibleLink = '';
    var chaptersRequestList = [];
    var DebugMessage = 'Прочитай, подумай, помолись';
    var newDay = new Date();

    DebugMessage += '\n' + newDay.getDate() + '/' + (newDay.getMonth() + 1) + '/' + newDay.getFullYear() + '\n';

    function getBibleText(book, chapterID, verses) {
        var chapter = book.get(chapterID);

        BibleText += '\nРозділ ' + chapterID + '\n';

        if(verses) {
            verses[chapterID].forEach((verse) => {
                BibleText += verse + ' ' + chapter.get(verse) + '\n';
            })
        } else {
            for(var i = 1; i < chapter.size; i++) {
                BibleText += i + ' ' + chapter.get(i.toString()) + '\n';
            }
        }

        BibleText += '\n';

        if(BibleText.length > TEXT_MAX_LENGTH) {
            DebugMessage = 'Длина главы ' + chapterID + ' составляет '  + BibleText.length + ' cимволов.';
        } else {
            chaptersRequestList[chaptersRequestList.length] = BibleText;
        }

        BibleText = '';
    }

    if(dayNumber) {
        readingPlanMap = getReadingPlanMap(BibleOneYearNewTestamentPlan);

        dailyReadingPlan = readingPlanMap.get(dayNumber.toString());

        dailyReadingPlan.map((plan) => {
            for(var bookID in plan) {
                var book = BibleMap.get(bookID);

                plan[bookID].map((chapter) => {
                    if(typeof chapter === 'object') {
                        for(var chapterID in chapter) {
                            getBibleText(book, chapterID, chapter);
                        }
                    } else {
                        getBibleText(book, chapter)                    }
                });
            }
        });

        BibleLink = getBibleLink(dailyReadingPlan);
    } else {
        DebugMessage = 'Читання Біблії у 2018 р.'
    }

    var textMessage = utf8.encode(DebugMessage + '\n' + BibleLink + '\n');

    // console.log(DebugMessage + '\n' + BibleLink + '\n' + chaptersRequestList);

    request(requestURL + textMessage)
        .on('response', function(response) {
            (function loop(i, chaptersRequestListLength, chaptersRequestList, requestURL) {
                if (i < chaptersRequestListLength) new Promise(resolve => {
                    request(requestURL + utf8.encode(chaptersRequestList[i]));
                    setTimeout(resolve, 3000);
                }).then(loop.bind(null, i+1, chaptersRequestListLength, chaptersRequestList, requestURL));
            })(0, chaptersRequestList.length, chaptersRequestList, requestURL);
    });