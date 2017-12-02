var getDailyPlan = function(dailyPlanJson) {
    var dailyPlan = '';
    let cntBooks = 1;

    for(var key in dailyPlanJson) {
        if (dailyPlanJson.hasOwnProperty(key)) {
            let book = dailyPlanJson[key];

            for(var k in book) {
                dailyPlan += k + ' ';

                book[k].forEach((chapter, i) => {
                    if(typeof chapter[0] === 'object') {
                        if(i > 0) {dailyPlan += ', '}
                        for(var chr in chapter[0]) {
                            if(chapter[0][chr].length > 1) {
                                dailyPlan += chr + ':' + chapter[0][chr][0] + '-' + chapter[0][chr][chapter[0][chr].length - 1];
                            } else {
                                dailyPlan += chr + ':' + chapter[0][chr][0];
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
