var getReadingPlanMap = function (readingPlan) {
    var readingPlanMap = new Map();

    for (let k of Object.keys(readingPlan)) {
        readingPlanMap.set(k, readingPlan[k]);
    }

    return readingPlanMap;
};

module.exports = getReadingPlanMap;