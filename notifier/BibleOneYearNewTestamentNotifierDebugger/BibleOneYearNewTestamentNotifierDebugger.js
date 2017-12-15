var cron = require('node-cron');
var sleep = require('sleep');

// cron.schedule('0 6 * * *', function(){
    const OUTRUNNING_DAYS = 17; // (49) whole chapter; (57) two chapters with verses scope; (79) one chapter with verses scope;
    const TEXT_MAX_LENGTH = 3900;
    // const CHAT_ID = '356584956'; //my personal chat with bot
    const CHAT_ID = '-1001295262074';
    const requestURL = 'https://api.telegram.org/bot499291228:AAHubvjndSbgxax0PauFpAsmy4XYFz9xRTI/sendMessage?chat_id=' + CHAT_ID + '&text=';
    var utf8 = require('utf8');
    var request = require('request');
    var BibleOneYearNewTestamentPlan = require('./BibleOneYearNewTestamentPlan.json');
    var getReadingPlanMap = require('./getReadingPlanMap');
    var getDayNumber = require('./getDayNumber');
    var BibleMap = require('./JsonToMapConverter');
    var now = new Date();
    var getBibleLink = require('./getDayPlanLink');
    var dayNumber;
    var readingPlanMap;
    var dailyReadingPlan;
    var BibleText = '';
    var BibleLink = '';
    var chaptersRequestList = [];
    var DebugMessage = 'Проверяем тексты за ';

    dayNumber = Math.abs(365 - (Math.floor(getDayNumber) + OUTRUNNING_DAYS));

    var newDay = new Date(2018, 0, 0).getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var outrunningDayTimestamp = newDay + (dayNumber * oneDay);
    var outrunningDay = new Date(outrunningDayTimestamp);

    DebugMessage += outrunningDay.getDate() + '/' + (outrunningDay.getMonth() + 1) + '/' + outrunningDay.getFullYear() + '\n';

    function getBibleText(book, chapterID, verses) {
        // console.log(book);
        var chapter = book.get(chapterID);

        BibleText += '\nГлава ' + chapterID + '\n';

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
        DebugMessage = 'План чтения на 2018 г.'
    }

    var textMessage = utf8.encode(DebugMessage + '\n' + BibleLink + '\n');

    console.log(DebugMessage + '\n' + BibleLink + '\n' + '\n' + chaptersRequestList);

    // request(requestURL + textMessage)
    //     .on('response', function(response) {
    //         (function loop(i, chaptersRequestListLength, chaptersRequestList, requestURL) {
    //             if (i < chaptersRequestListLength) new Promise(resolve => {
    //                 request(requestURL + utf8.encode(chaptersRequestList[i]));
    //                 setTimeout(resolve, 3000);
    //             }).then(loop.bind(null, i+1, chaptersRequestListLength, chaptersRequestList, requestURL));
    //         })(0, chaptersRequestList.length, chaptersRequestList, requestURL);
    // });
// });
