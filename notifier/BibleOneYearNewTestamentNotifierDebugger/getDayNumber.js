var isLeapYear = function (year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};
var getToday = function() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay).toString();

    return isLeapYear(now.getFullYear()) ? day : (parseInt(day) + 1).toString();
};

module.exports = getToday();