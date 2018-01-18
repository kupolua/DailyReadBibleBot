    const TEXT_MAX_LENGTH = 3900;
    const CHAT_ID = '356584956'; //https://t.me/ChurchRevival
    // const CHAT_ID = '-1001160020446'; //https://t.me/ChurchRevival
    const requestURL = 'https://api.telegram.org/bot487404455:AAFhJLu40DnzAElC7zXfM1hHG1e-14VpsDM/sendMessage?chat_id=' + CHAT_ID + '&text=';
    var utf8 = require('utf8');
    var request = require('request');
    var BibleAbbreviationMap = require('./BibleAbbreviationMap');
    var BibleChronologyPlan = require('./BibleChronologyPlan.json');
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

    function getBibleText(bookID, book, chapterID, verses) {
        var chapter = book.get(chapterID);

        BibleText += '\n' + bookID + ' Глава ' + chapterID + '\n';

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
        readingPlanMap = getReadingPlanMap(BibleChronologyPlan);

        dailyReadingPlan = readingPlanMap.get(dayNumber.toString());
        
        dailyReadingPlan.map((plan) => {
            for(var bookID in plan) {
                var book;
                BibleAbbreviationMap.forEach((abbr) => {
                    if(abbr[0].startsWith(bookID.substr(0, 3))) {
                        book = BibleMap.get(abbr[1]);
                    }
                });

                // plan[bookID].map((chapter) => {
                //     if(typeof chapter === 'object' && !Array.isArray(chapter)) {
                //         for(var chapterID in chapter) {
                //             getBibleText(bookID, book, chapterID, chapter);
                //         }
                //     } else {
                //         getBibleText(bookID, book, chapter[0])
                //     }
                // });
            }
        });

        BibleLink = getBibleLink(dailyReadingPlan);
    } else {
        DebugMessage = 'Читаем Библию в 2018 г.'
    }

    var textMessage = utf8.encode(DebugMessage + '\n' + BibleLink + '\n');

    // console.log(DebugMessage + '\n' + BibleLink + '\n');
    // console.log(BibleLink);

    request(requestURL + textMessage);