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

    if(now.getFullYear().toString() === Bible2years.years[0]) {
        dayNumber = Math.floor(getDayNumber);
    }

    if(now.getFullYear().toString() === Bible2years.years[1]) {
        dayNumber = Math.floor(getDayNumber) + 365;
    }

    if(dayNumber) {
        readingPlanMap = getReadingPlanMap(Bible2years.plan);

        dailyReadingPlan = readingPlanMap.get(dayNumber.toString());

        dailyReadingPlan.map((plan) => {
            for(var bookID in plan) {
                var book = BibleMap.get(bookID);

                plan[bookID].map((chapterID) => {
                    var chapter = book.get(chapterID);

                    BibleText += 'Глава ' + chapterID + '\n';

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

    console.log(BibleText);
    console.log(BibleLink);

    // request('https://api.telegram.org/bot487404455:AAFhJLu40DnzAElC7zXfM1hHG1e-14VpsDM/sendMessage?chat_id=-297700668&text=' + utf8.encode(BibleLink + '\n' + BibleText));
});
