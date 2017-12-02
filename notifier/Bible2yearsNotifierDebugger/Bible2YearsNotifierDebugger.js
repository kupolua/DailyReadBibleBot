var cron = require('node-cron');

cron.schedule('33 20 * * *', function(){
    var utf8 = require('utf8');
    var request = require('request');
    var Bible2years = require('./Bible2years.json');
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
    const outrunningDays = 29;
    var DebugMessage = 'Проверяем тексты за ';

    // if(now.getFullYear().toString() === Bible2years.years[0]) { //Disabled for debug mode
        dayNumber = Math.abs(365 - (Math.floor(getDayNumber) + outrunningDays));
    // }

    var newDay = new Date(2018, 0, 0).getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var outrunningDayTimestamp = newDay + (dayNumber * oneDay);
    var outrunningDay = new Date(outrunningDayTimestamp);

    DebugMessage += outrunningDay.getDate() + '/' + (outrunningDay.getMonth() + 1) + '/' + outrunningDay.getFullYear() + '\n';

    if(now.getFullYear().toString() === Bible2years.years[1]) {
        dayNumber = Math.abs(365 - (Math.floor(getDayNumber) + outrunningDays)) + 365;
    }

    if(dayNumber) {
        readingPlanMap = getReadingPlanMap(Bible2years.plan);

        dailyReadingPlan = readingPlanMap.get(dayNumber.toString());

        dailyReadingPlan.map((plan) => {
            for(var bookID in plan) {
                var book = BibleMap.get(bookID);

                plan[bookID].map((chapterID) => {
                    var chapter = book.get(chapterID);

                    BibleText += '\nГлава ' + chapterID + '\n';

                    for(var i = 1; i < chapter.size; i++) {
                        BibleText += i + ' ' + chapter.get(i.toString()) + '\n';
                    }

                    BibleText += '\n'
                });
            }
        });

        BibleLink = getBibleLink(dailyReadingPlan);
    } else {
        BibleText = 'План чтения на ' + Bible2years.years[0] + '/' + Bible2years.years[1] + ' гг.'
    }

    // console.log(DebugMessage);
    // console.log(BibleLink);
    // console.log(BibleText);

    request('https://api.telegram.org/bot487404455:AAFhJLu40DnzAElC7zXfM1hHG1e-14VpsDM/sendMessage?chat_id=-297700668&text=' + utf8.encode(DebugMessage + '\n' + BibleLink + '\n' + BibleText));
});
