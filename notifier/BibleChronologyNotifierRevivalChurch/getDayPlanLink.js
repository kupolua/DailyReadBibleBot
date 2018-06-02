var BibleAbbreviationMap = require('./BibleAbbreviationMap');

var getDailyPlan = function(dailyPlanJson, dayNumber) {
    var dailyPlan = '';
    let cntBooks = 1;

    for(var key in dailyPlanJson) {
        if (dailyPlanJson.hasOwnProperty(key)) {
            let book = dailyPlanJson[key];

            for(var k in book) {
                dailyPlan += k + ' ';

                book[k].forEach((chapters, i) => {
                    if(typeof chapters[0] === 'object') {
                        chapters.forEach((chapter) => {
                            let separator = i < (book[k].length - 1) ? ', ' : '';

                            if(typeof chapter === 'object') {
                                for(var id in chapter) {
                                    if(chapter[id].length === 1) {
                                        dailyPlan += id + ':' + chapter[id][0] + separator;
                                    } else {
                                        dailyPlan += id + ':' + chapter[id][0] + '-' + chapter[id][chapter[id].length - 1] + separator;
                                    }
                                }
                            }
                            if(typeof chapter === 'string') {
                                dailyPlan += separator + chapter;
                            }
                        });
                    } else {
                        let separator = i < book[k].length - 1 ? ', ' : '';

                        dailyPlan += chapters + separator;
                    }
                });

                dailyPlan += cntBooks < dailyPlanJson.length ? '; ' : '';
                cntBooks++;
            }
        }
    }
//test
    // if(dailyPlan.includes("undefined-undefined")) {
    //     console.log(dayNumber, dailyPlan);
    // }

    return dailyPlan;
};

module.exports = getDailyPlan;
