var BibleAbbreviationMap = require('./BibleAbbreviationMap');

var getDailyPlan = function(dailyPlanJson) {
    var dailyPlan = '';
    let cntBooks = 1;

    for(var key in dailyPlanJson) {
        if (dailyPlanJson.hasOwnProperty(key)) {
            let book = dailyPlanJson[key];

            for(var k in book) {
                BibleAbbreviationMap.forEach((abbr) => {
                    if(abbr[1] == k) {
                        dailyPlan += abbr[2] + ' ';
                    }
                });

                book[k].forEach((chapter, i) => {
                    if(typeof chapter === 'object') {
                        if(i > 0) {dailyPlan += ', '}
                        for(var chr in chapter) {
                            if(chapter[chr].length > 1) {
                                dailyPlan += chr + ':' + chapter[chr][0] + '-' + chapter[chr][chapter[chr].length - 1];
                            } else {
                                dailyPlan += chr + ':' + chapter[chr][0];
                            }
                        }
                    } else {
                        let separator = i < book[k].length - 1 ? ',' : '';

                        dailyPlan += chapter + separator;
                    }
                });

                dailyPlan += cntBooks < dailyPlanJson.length ? '; ' : '';
                cntBooks++;
            }
        }
    }

    return dailyPlan;
}

module.exports = getDailyPlan;
