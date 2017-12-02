var getToday = function() {
    var currentDate = new Date();
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay).toString();

    return day;
}

module.exports = getToday();